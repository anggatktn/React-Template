import { apiClient, type ApiResponse } from '../utils/api/axios-client';
import { BaseService } from '../utils/base/BaseService';
import { getUser, setUser } from '../utils/local-storage/auth-local';

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

/* 
{
    "id": "01H8XGJWBWBAQ2V3B6B0W0B0Z0",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "emailVerified": false,
    "image": "https://example.com/avatar.png",
    "status": "pending-business-profile",
    "createdAt": "2025-12-09T00:52:47.322Z",
    "updatedAt": "2025-12-09T00:52:47.322Z"
  }
*/

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    status: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
}

export interface VerifyOtpResponse {
    token: string;
}

export interface OtpResponse {
    message: string;
    expiresIn: number;
}

/* 
{
  "vendorCode": "string",
  "customerName": "string",
  "companyName": "string",
  "companyUen": "string",
  "companyEmail": "user@example.com",
  "customerMobile": "string",
  "addressLine1": "string",
  "addressLine2": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "country": "string"
}
*/

export interface UpdateProfileRequest {
    vendorCode: string;
    customerName: string;
    companyName: string;
    companyUen: string;
    companyEmail: string;
    customerMobile: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

/**
 * Authentication Service with automatic loading state
 * Extends BaseService to track loading state automatically
 */
export class AuthService extends BaseService {

    async requestOTPViaEmail(email: string): Promise<ApiResponse<OtpResponse>> {
        return this.execute(() =>
            apiClient.post<OtpResponse>(`/auth/email/otp`, { email })
        );
    }

    /**
     * Sign in user
     */
    async signIn(credentials: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> {
        return this.execute(() =>
            apiClient.post<VerifyOtpResponse>(`/auth/email/verify`, credentials)
        );
    }

    /**
     * Sign up new user
     */
    async signUp(userData: SignUpRequest): Promise<ApiResponse<OtpResponse>> {
        return this.execute(() =>
            apiClient.post<OtpResponse>(`/auth/signup`, userData)
        );
    }

    /**
     * Verify OTP
     */
    async verifyOtp(otpData: VerifyOtpRequest): Promise<ApiResponse<AuthResponse>> {
        return this.execute(() =>
            apiClient.post<AuthResponse>(`/auth/verify-otp`, otpData)
        );
    }

    /**
     * Resend OTP
     */
    async resendOtp(email: string): Promise<ApiResponse<OtpResponse>> {
        return this.execute(() =>
            apiClient.post<OtpResponse>(`/auth/resend-otp`, { email })
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
    async getCurrentUser(): Promise<ApiResponse<AuthResponse>> {
        return this.execute(() =>
            // apiClient.get<AuthResponse>(`http://localhost:5432/api/v1/users`)
            apiClient.get<AuthResponse>(`/users`).then((res) => {
                setUser(res.data);
                return res;
            })
        );
    }

    async updateUserProfile(userData: UpdateProfileRequest): Promise<ApiResponse<any>> {
        const user = getUser();
        return this.execute(() =>
            apiClient.post<any>(`/users/${user?.id}/business`, userData)
        );
    }
}

// Export singleton instance
export const authService = new AuthService();
