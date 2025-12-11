/**
 * Storage Encryption Utility
 * Provides synchronous AES-256 encryption/decryption for localStorage values using crypto-js
 * In development mode, encryption is disabled for easier debugging
 * In production mode, values are encrypted using AES-256
 */

import CryptoJS from 'crypto-js';

export class StorageEncryption {
    private readonly secretKey: string;
    private readonly isDevelopment: boolean;

    /**
     * Create a new StorageEncryption instance
     * @param secretKey - The secret key for encryption (should be stored in env variables in production)
     */
    constructor(
        secretKey: string = 'your-secret-key-change-this-in-production'
    ) {
        this.secretKey = secretKey;
        this.isDevelopment = import.meta.env.DEV;

        if (this.isDevelopment) {
            console.log('[StorageEncryption] Running in development mode - encryption disabled');
        }
    }

    /**
     * Encrypt a string value using AES-256 (only in production)
     * @param value - The plain text value to encrypt
     * @returns Encrypted value as a string (or plain text in dev mode)
     */
    public encrypt(value: string): string {
        // Skip encryption in development mode
        if (this.isDevelopment) {
            return value;
        }

        try {
            return CryptoJS.AES.encrypt(value, this.secretKey).toString();
        } catch (error) {
            console.error('Encryption failed:', error);
            return '';
        }
    }

    /**
     * Decrypt an encrypted string value (only in production)
     * @param encryptedValue - Encrypted value string (or plain text in dev mode)
     * @returns Decrypted plain text value
     */
    public decrypt(encryptedValue: string): string {
        // Skip decryption in development mode
        if (this.isDevelopment) {
            return encryptedValue;
        }

        try {
            const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return decrypted;
        } catch (error) {
            console.error('Decryption failed:', error);
            return '';
        }
    }

    /**
     * Set a value in localStorage (encrypted in production, plain text in dev)
     * @param key - The storage key
     * @param value - The value to encrypt and store
     */
    public setItem(key: string, value: string): void {
        const processedValue = this.encrypt(value);
        localStorage.setItem(key, processedValue);
    }

    /**
     * Get and decrypt a value from localStorage (decrypted in production, plain text in dev)
     * @param key - The storage key
     * @returns Decrypted value or null if not found
     */
    public getItem(key: string): string | null {
        const storedValue = localStorage.getItem(key);
        if (!storedValue) return null;

        const decryptedValue = this.decrypt(storedValue);
        return decryptedValue || null;
    }

    /**
     * Remove an item from localStorage
     * @param key - The storage key
     */
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Clear all items from localStorage
     */
    public clearStorage(): void {
        localStorage.clear();
    }
}

// Export singleton instance with default configuration
export const storageEncryption = new StorageEncryption();
