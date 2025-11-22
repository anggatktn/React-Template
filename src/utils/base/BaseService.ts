import { BehaviorSubject, Observable } from 'rxjs';
import type { ApiResponse, ApiError } from '../api/axios-client';

/**
 * Base Service class that tracks loading state
 * Similar to BaseUseCase in Kotlin
 */
export abstract class BaseService {
    private _isLoading = new BehaviorSubject<boolean>(false);

    /**
     * Observable loading state
     */
    public get isLoading$(): Observable<boolean> {
        return this._isLoading.asObservable();
    }

    /**
     * Current loading state value
     */
    public get isLoading(): boolean {
        return this._isLoading.value;
    }

    /**
     * Execute an API call with automatic loading state management
     */
    protected async execute<T>(
        apiCall: () => Promise<ApiResponse<T>>
    ): Promise<ApiResponse<T>> {
        this._isLoading.next(true);

        try {
            const response = await apiCall();
            return response;
        } finally {
            this._isLoading.next(false);
        }
    }

    /**
     * Execute an API call that might throw errors
     */
    protected async executeWithError<T>(
        apiCall: () => Promise<ApiResponse<T>>
    ): Promise<ApiResponse<T>> {
        this._isLoading.next(true);

        try {
            return await apiCall();
        } catch (error) {
            throw error;
        } finally {
            this._isLoading.next(false);
        }
    }
}
