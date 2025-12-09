/**
 * Authentication utility functions
 * Provides helpers for checking authentication status and managing auth tokens
 * All values are encrypted using AES-GCM encryption before storing in localStorage
 */

import type { AuthResponse } from "../../services/auth-service";
import { UserType } from "../../services/models/user-type";
import { storageEncryption } from "../encryption/StorageEncryption";

const AUTH_TOKEN_KEY = 'auth_token';
const USER_TYPE_KEY = 'user_type';
const USER_KEY = 'user';

/**
 * Check if user is authenticated
 * @returns true if user has a valid auth token
 */
export const isAuthenticated = (): boolean => {
    // Synchronous check - just verify the encrypted token exists
    const encryptedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return encryptedToken !== null && encryptedToken.trim() !== '';
};

/**
 * Get the current authentication token from localStorage (decrypted)
 * @returns the auth token or null if not found
 */
export const getAuthToken = async (): Promise<string | null> => {
    return await storageEncryption.getItem(AUTH_TOKEN_KEY);
};

/**
 * Set the authentication token in localStorage (encrypted)
 * @param token - The authentication token to store
 */
export const setAuthToken = async (token: string): Promise<void> => {
    await storageEncryption.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Remove the authentication token from localStorage
 */
export const clearAuthToken = (): void => {
    storageEncryption.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Check if authentication is required and return redirect path if needed
 * @param requiresAuth - Whether the route requires authentication
 * @returns redirect path if auth is required but user is not authenticated, null otherwise
 */
export const requireAuth = (requiresAuth: boolean): string | null => {
    if (requiresAuth && !isAuthenticated()) {
        return '/';
    }
    return null;
};

/**
 * Get the user type from localStorage (decrypted)
 * @returns UserType or null if not found
 */
export const getUserType = async (): Promise<UserType | null> => {
    const userType = await storageEncryption.getItem(USER_TYPE_KEY);
    return userType ? UserType.getUserType(userType) : null;
};

/**
 * Set the user type in localStorage (encrypted)
 * @param userType - The user type to store
 */
export const setUserType = async (userType: UserType): Promise<void> => {
    await storageEncryption.setItem(USER_TYPE_KEY, UserType.getString(userType));
};


export const getUser = async (): Promise<AuthResponse | null> => {
    const user = await storageEncryption.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const setUser = async (user: AuthResponse): Promise<void> => {
    await storageEncryption.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Remove the user type from localStorage
 */
export const clearUserType = (): void => {
    storageEncryption.removeItem(USER_TYPE_KEY);
};
