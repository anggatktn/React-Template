import { StateFlow } from '../StateFlow';
import { combineLatest, map } from 'rxjs';
import type { BaseService } from './BaseService';
import { useEffect, useState } from 'react';

/**
 * Base Model class with automatic loading state management
 * Similar to BaseScreenModel in Kotlin
 * 
 * @example
 * ```typescript
 * export class AuthModel extends BaseModel<AuthState, AuthEvent> {
 *     constructor() {
 *         super({ isAuthenticated: false });
 *     }
 * 
 *     protected get registeredServices(): BaseService[] {
 *         return [authService, userService];
 *     }
 * 
 *     public onEvent(event: AuthEvent): void {
 *         // Handle events
 *     }
 * }
 * ```
 */
export abstract class BaseModel<UiState> {
    protected readonly _state: StateFlow<UiState>;

    /**
     * Public state accessor
     */
    public get state(): StateFlow<UiState> {
        return this._state;
    }

    /**
     * Get current state value
     */
    protected get currentState(): UiState {
        return this._state.getValue();
    }

    /**
     * Register services/use cases that should contribute to loading state
     * Override this in your model to register your services
     */
    protected get registeredServices(): BaseService[] {
        return [];
    }

    /**
     * Combined loading state from all registered services
     * Returns true if ANY service is loading
     */
    private _isLoading: boolean = false;
    private _loadingUnsubscribe?: () => void;

    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(initialState: UiState) {
        this._state = new StateFlow(initialState);
        this.initializeLoadingState();
    }

    /**
     * Initialize loading state listener
     */
    private initializeLoadingState(): void {
        const services = this.registeredServices;

        if (services.length === 0) {
            return;
        }

        // Combine all service loading states
        const subscription = combineLatest(
            services.map(service => service.isLoading$)
        ).pipe(
            map(loadingStates => loadingStates.some(isLoading => isLoading))
        ).subscribe(isLoading => {
            this._isLoading = isLoading;
            // Optionally trigger state update if you want loading in state
            this.onLoadingStateChanged(isLoading);
        });

        this._loadingUnsubscribe = () => subscription.unsubscribe();
    }

    /**
     * Called when loading state changes
     * Override this if you want to update your state when loading changes
     */
    protected onLoadingStateChanged(isLoading: boolean): void {
        // Override in subclass if needed
    }

    /**
     * Update state
     */
    protected updateState(updater: (currentState: UiState) => UiState): void {
        this._state.setValue(updater(this.currentState));
    }

    /**
     * Cleanup
     */
    public cleanup(): void {
        if (this._loadingUnsubscribe) {
            this._loadingUnsubscribe();
        }
    }
}

/**
 * React hook to use loading state from BaseModel
 */
export function useModelLoading(model: BaseModel<any>): boolean {
    const [isLoading, setIsLoading] = useState(model.isLoading);

    useEffect(() => {
        // Poll for loading state changes
        // This is a simple approach - you could also make BaseModel emit events
        const interval = setInterval(() => {
            setIsLoading(model.isLoading);
        }, 100);

        return () => clearInterval(interval);
    }, [model]);

    return isLoading;
}
