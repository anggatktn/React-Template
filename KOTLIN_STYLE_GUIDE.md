# Kotlin-Style Base Model Pattern

This guide explains how to use the Kotlin-inspired `BaseModel` pattern for automatic loading state management.

## 🎯 Concept

Just like in Kotlin with `BaseScreenModel`, you register your services/use cases, and the loading state is **automatically** combined from all registered services. If ANY service is loading, `isLoading` becomes `true`.

## 📁 Architecture

```
src/
├── utils/
│   └── base/
│       ├── BaseService.ts          # Base class for services (tracks loading)
│       └── BaseModel.ts            # Base class for models (combines loading)
└── services/
    └── auth.service-base.ts        # Service extending BaseService
```

## 🚀 Quick Start

### 1. Create a Service (extends BaseService)

```typescript
import { BaseService } from '../utils/base/BaseService';
import { apiClient, type ApiResponse } from '../utils/api/axios-client';

export class AuthService extends BaseService {
    async signIn(credentials: SignInRequest): Promise<ApiResponse<AuthResponse>> {
        // Use this.execute() - it automatically manages loading state!
        return this.execute(() => 
            apiClient.post<AuthResponse>('/auth/signin', credentials)
        );
    }

    async signUp(userData: SignUpRequest): Promise<ApiResponse<OtpResponse>> {
        return this.execute(() =>
            apiClient.post<OtpResponse>('/auth/signup', userData)
        );
    }
}

export const authService = new AuthService();
```

### 2. Create a Model (extends BaseModel)

```typescript
import { BaseModel } from "../../utils/base/BaseModel";
import { authService } from "../../services/auth.service-base";
import type { BaseService } from "../../utils/base/BaseService";

export type AuthEvent = 
    | { type: 'SIGN_IN'; email: string; password: string }
    | { type: 'SIGN_UP'; email: string; password: string; name: string };

export class AuthModel extends BaseModel<AuthState, AuthEvent> {
    constructor() {
        super({ isAuthenticated: false, isLoading: false });
    }

    /**
     * ✨ Register services - their loading states combine automatically!
     * Just like registerLoadingListener in Kotlin
     */
    protected get registeredServices(): BaseService[] {
        return [authService]; // Add all services you want to track
    }

    /**
     * Optional: Update state when loading changes
     */
    protected onLoadingStateChanged(isLoading: boolean): void {
        this.updateState(state => ({
            ...state,
            isLoading
        }));
    }

    /**
     * Handle events
     */
    public onEvent(event: AuthEvent): void {
        switch (event.type) {
            case 'SIGN_IN':
                this.handleSignIn(event.email, event.password);
                break;
            case 'SIGN_UP':
                this.handleSignUp(event.email, event.password, event.name);
                break;
        }
    }

    private async handleSignIn(email: string, password: string): Promise<void> {
        try {
            const response = await authService.signIn({ email, password });
            // No manual loading state management!
            if (response.success) {
                this.updateState(state => ({ ...state, isAuthenticated: true }));
            }
        } catch (error) {
            // Handle error
        }
    }
}
```

### 3. Use in React Component

```typescript
import { useMemo } from 'react';
import { useStateFlow } from '../../utils/StateFlow';
import { AuthModel } from './auth-model';

const AuthPage: React.FC = () => {
    const model = useMemo(() => new AuthModel(), []);
    const state = useStateFlow(model.state);

    const handleSignIn = () => {
        model.onEvent({
            type: 'SIGN_IN',
            email: 'user@example.com',
            password: 'password123'
        });
    };

    return (
        <div>
            {/* Loading state is automatic! */}
            {state.isLoading && <Spin />}
            
            <Button onClick={handleSignIn} disabled={state.isLoading}>
                Sign In
            </Button>
        </div>
    );
};
```

## 🎨 Key Features

### ✅ Automatic Loading State

```typescript
protected get registeredServices(): BaseService[] {
    return [
        authService,
        userService,
        postService
    ];
}
```

If **any** of these services is loading, `model.isLoading` becomes `true` automatically!

### ✅ No Manual Loading Management

**Kotlin:**
```kotlin
// Service automatically manages loading
suspend fun signIn(credentials: SignInRequest) = execute {
    api.signIn(credentials)
}
```

**TypeScript:**
```typescript
// Service automatically manages loading
async signIn(credentials: SignInRequest) {
    return this.execute(() => 
        apiClient.post('/auth/signin', credentials)
    );
}
```

### ✅ Event-Driven Architecture

```typescript
// Clean, type-safe events
model.onEvent({ type: 'SIGN_IN', email, password });
model.onEvent({ type: 'SIGN_UP', email, password, name });
```

### ✅ State Updates

```typescript
// Kotlin-style state updates
this.updateState(state => ({
    ...state,
    isAuthenticated: true
}));

// Or access current state
const current = this.currentState;
```

## 📊 Comparison

### Kotlin (Original)
```kotlin
abstract class BaseScreenModel<UiState, Event>(
    initialState: UiState
) : ViewModel() {
    protected val _uiState : MutableStateFlow<UiState> = MutableStateFlow(initialState)
    val uiState = _uiState.asStateFlow()
    protected open val registerLoadingListener : List<BaseUseCase<*, *>> = emptyList()
    
    val isLoading by lazy {
        combine(registerLoadingListener.map { it.isLoading }) {
            it.any { it }
        }.stateIn(viewModelScope, SharingStarted.Lazily, false)
    }
}
```

### TypeScript (This Implementation)
```typescript
export abstract class BaseModel<UiState, Event = void> {
    protected readonly _state: StateFlow<UiState>;
    
    protected get registeredServices(): BaseService[] {
        return [];
    }

    public get isLoading(): boolean {
        // Combines all service loading states
        return this._isLoading;
    }
}
```

## 🔧 Advanced Usage

### Multiple Services

```typescript
export class DashboardModel extends BaseModel<DashboardState, DashboardEvent> {
    protected get registeredServices(): BaseService[] {
        return [
            userService,
            postService,
            commentService,
            analyticsService
        ];
    }
    
    // If ANY of these services is loading, isLoading = true
}
```

### Custom Loading Logic

```typescript
protected onLoadingStateChanged(isLoading: boolean): void {
    // Custom logic when loading state changes
    if (isLoading) {
        console.log('Started loading...');
    } else {
        console.log('Finished loading!');
    }
    
    // Update state
    this.updateState(state => ({
        ...state,
        isLoading
    }));
}
```

### Service-Specific Loading

```typescript
// Access individual service loading state
if (authService.isLoading) {
    console.log('Auth service is loading');
}

// Or subscribe to changes
authService.isLoading$.subscribe(isLoading => {
    console.log('Auth loading:', isLoading);
});
```

## 📚 Example Files

- **Base Classes**: 
  - `src/utils/base/BaseService.ts`
  - `src/utils/base/BaseModel.ts`
- **Service Example**: `src/services/auth.service-base.ts`
- **Model Example**: `src/pages/auth/auth-screen-model-base.tsx`
- **Component Example**: `src/pages/auth/auth-page-example.tsx`

## 🎯 Benefits

1. **No Manual Loading State** - Services track their own loading
2. **Automatic Combination** - Model combines all service loading states
3. **Type-Safe Events** - Event-driven architecture with TypeScript
4. **Clean Separation** - Services handle API, Models handle business logic
5. **Familiar Pattern** - Same as Kotlin's BaseScreenModel
6. **Reactive** - Uses RxJS for reactive loading state

## 🚨 Important Notes

- Install RxJS: `npm install rxjs`
- Services must extend `BaseService`
- Models must extend `BaseModel`
- Use `this.execute()` in services for automatic loading tracking
- Register all services in `registeredServices` getter

## 🔄 Migration from Old Pattern

**Old (Manual):**
```typescript
this.setLoading(true);
try {
    await service.getData();
} finally {
    this.setLoading(false);
}
```

**New (Automatic):**
```typescript
// In Service
async getData() {
    return this.execute(() => apiClient.get('/data'));
}

// In Model
protected get registeredServices() {
    return [service];
}

// Loading is automatic! 🎉
```
