/**
 * Authentication utility functions
 * Provides helpers for checking authentication status and managing auth tokens
 */

import { UserType } from "../../services/models/user-type";

const AUTH_TOKEN_KEY = 'auth_token';
const USER_TYPE_KEY = 'user_type';

/**
 * Check if user is authenticated
 * @returns true if user has a valid auth token
 */
export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return token !== null && token.trim() !== '';
};

/**
 * Get the current authentication token from localStorage
 * @returns the auth token or null if not found
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Set the authentication token in localStorage
 * @param token - The authentication token to store
 */
export const setAuthToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Remove the authentication token from localStorage
 */
export const clearAuthToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
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

export const getUserType = (): UserType | null => {
    const userType = localStorage.getItem(USER_TYPE_KEY);
    return userType ? UserType.getUserType(userType) : null;
};

export const setUserType = (userType: UserType): void => {
    localStorage.setItem(USER_TYPE_KEY, UserType.getString(userType));
};

export const clearUserType = (): void => {
    localStorage.removeItem(USER_TYPE_KEY);
};

export const clearLocalStorage = (): void => {
    localStorage.clear();
};
