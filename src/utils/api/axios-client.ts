import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

/**
 * API Response wrapper for consistent response handling
 */
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
    statusCode: number;
}

/**
 * API Error structure
 */
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

/**
 * Axios Client Configuration
 */
class AxiosClient {
    private instance: AxiosInstance;
    private readonly baseURL: string;

    constructor() {
        // Set your API base URL here or use environment variable
        this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 30000, // 30 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    /**
     * Setup request and response interceptors
     */
    private setupInterceptors(): void {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Add auth token if available
                const token = this.getAuthToken();
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log request in development
                if (import.meta.env.DEV) {
                    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
                }

                return config;
            },
            (error) => {
                console.error('[API Request Error]', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Log response in development
                if (import.meta.env.DEV) {
                    console.log(`[API Response] ${response.config.url}`, response.data);
                }

                return response;
            },
            (error) => {
                return this.handleError(error);
            }
        );
    }

    /**
     * Get authentication token from storage
     */
    private getAuthToken(): string | null {
        // Implement your token retrieval logic here
        // Example: return localStorage.getItem('auth_token');
        return localStorage.getItem('auth_token');
    }

    /**
     * Handle API errors
     */
    private handleError(error: any): Promise<never> {
        if (error.response) {
            // Server responded with error status
            const statusCode = error.response.status;
            const message = error.response.data?.message || error.message;

            console.error(`[API Error ${statusCode}]`, message);

            // Handle specific status codes
            switch (statusCode) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    this.handleUnauthorized();
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error');
                    break;
            }

            const apiError: ApiError = {
                message,
                statusCode,
                errors: error.response.data?.errors,
            };

            return Promise.reject(apiError);
        } else if (error.request) {
            // Request made but no response received
            console.error('[API Error] No response received', error.request);
            const apiError: ApiError = {
                message: 'Network error. Please check your connection.',
                statusCode: 0,
            };
            return Promise.reject(apiError);
        } else {
            // Error in request setup
            console.error('[API Error]', error.message);
            const apiError: ApiError = {
                message: error.message || 'An unexpected error occurred',
                statusCode: 0,
            };
            return Promise.reject(apiError);
        }
    }

    /**
     * Handle unauthorized access
     */
    private handleUnauthorized(): void {
        localStorage.removeItem('auth_token');
        // Redirect to login page
        window.location.href = '/auth';
    }

    /**
     * Set authentication token
     */
    public setAuthToken(token: string): void {
        localStorage.setItem('auth_token', token);
    }

    /**
     * Clear authentication token
     */
    public clearAuthToken(): void {
        localStorage.removeItem('auth_token');
    }

    /**
     * GET request
     */
    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.instance.get<ApiResponse<T>>(url, config);
        return response.data;
    }

    /**
     * POST request
     */
    public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.instance.post<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    /**
     * PUT request
     */
    public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.instance.put<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    /**
     * PATCH request
     */
    public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    /**
     * DELETE request
     */
    public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.instance.delete<ApiResponse<T>>(url, config);
        return response.data;
    }

    /**
     * Upload file(s)
     */
    public async upload<T = any>(url: string, formData: FormData, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<T>> {
        const response = await this.instance.post<ApiResponse<T>>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        });
        return response.data;
    }
}

// Export singleton instance
export const apiClient = new AxiosClient();
