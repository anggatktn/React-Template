import { apiClient, type ApiResponse } from '../utils/api/axios-client';
import { BaseService } from '../utils/base/BaseService';

/**
 * Auth API request/response types
 */

export interface EmailOtpRequest {
    email: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export interface OtpResponse {
    message: string;
    expiresIn: number;
}

/**
 * Authentication Service with automatic loading state
 * Extends BaseService to track loading state automatically
 */
export class AuthService extends BaseService {
    private readonly basePath = '/auth';

    async requestOTPViaEmail(email: string): Promise<ApiResponse<OtpResponse>> {
        return this.execute(() =>
            apiClient.post<OtpResponse>(`${this.basePath}/email/otp`, { email })
        );
    }

    /**
     * Sign in user
     */
    async signIn(credentials: VerifyOtpRequest): Promise<ApiResponse<AuthResponse>> {
        return this.execute(() =>
            apiClient.post<AuthResponse>(`${this.basePath}/email/verify`, credentials)
        );
    }

    /**
     * Sign up new user
     */
    async signUp(userData: SignUpRequest): Promise<ApiResponse<OtpResponse>> {
        return this.execute(() =>
            apiClient.post<OtpResponse>(`${this.basePath}/signup`, userData)
        );
    }

    /**
     * Verify OTP
     */
    async verifyOtp(otpData: VerifyOtpRequest): Promise<ApiResponse<AuthResponse>> {
        return this.execute(() =>
            apiClient.post<AuthResponse>(`${this.basePath}/verify-otp`, otpData)
        );
    }

    /**
     * Resend OTP
     */
    async resendOtp(email: string): Promise<ApiResponse<OtpResponse>> {
        return this.execute(() =>
            apiClient.post<OtpResponse>(`${this.basePath}/resend-otp`, { email })
        );
    }

    /**
     * Sign out user
     */
    async signOut(): Promise<void> {
        apiClient.clearAuthToken();
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
        return this.execute(() =>
            apiClient.get<AuthResponse['user']>(`${this.basePath}/users`)
        );
    }
}

// Export singleton instance
export const authService = new AuthService();
