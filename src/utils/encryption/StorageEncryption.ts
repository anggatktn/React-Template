/**
 * Storage Encryption Utility
 * Provides AES-GCM encryption/decryption for localStorage values
 */

export class StorageEncryption {
    private readonly secretKey: string;
    private readonly saltValue: string;
    private readonly iterations: number;
    private cachedKey: CryptoKey | null = null;

    /**
     * Create a new StorageEncryption instance
     * @param secretKey - The secret key for encryption (should be stored in env variables in production)
     * @param saltValue - Salt value for key derivation (should be unique per user in production)
     * @param iterations - Number of PBKDF2 iterations (default: 100000)
     */
    constructor(
        secretKey: string = 'your-secret-key-change-this-in-production',
        saltValue: string = 'salt-value',
        iterations: number = 100000
    ) {
        this.secretKey = secretKey;
        this.saltValue = saltValue;
        this.iterations = iterations;
    }

    /**
     * Derive a cryptographic key from the secret
     * Results are cached to avoid repeated derivation
     */
    private async getEncryptionKey(): Promise<CryptoKey> {
        if (this.cachedKey) {
            return this.cachedKey;
        }

        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(this.secretKey),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );

        this.cachedKey = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: encoder.encode(this.saltValue),
                iterations: this.iterations,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );

        return this.cachedKey;
    }

    /**
     * Encrypt a string value using AES-GCM
     * @param value - The plain text value to encrypt
     * @returns Base64 encoded encrypted value with IV
     */
    public async encrypt(value: string): Promise<string> {
        const encoder = new TextEncoder();
        const key = await this.getEncryptionKey();
        const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 bytes IV for AES-GCM

        const encryptedData = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encoder.encode(value)
        );

        // Combine IV and encrypted data
        const combined = new Uint8Array(iv.length + encryptedData.byteLength);
        combined.set(iv, 0);
        combined.set(new Uint8Array(encryptedData), iv.length);

        // Convert to base64
        return btoa(String.fromCharCode(...combined));
    }

    /**
     * Decrypt an encrypted string value
     * @param encryptedValue - Base64 encoded encrypted value with IV
     * @returns Decrypted plain text value
     */
    public async decrypt(encryptedValue: string): Promise<string> {
        try {
            const decoder = new TextDecoder();
            const key = await this.getEncryptionKey();

            // Decode from base64
            const combined = Uint8Array.from(atob(encryptedValue), c => c.charCodeAt(0));

            // Extract IV and encrypted data
            const iv = combined.slice(0, 12);
            const encryptedData = combined.slice(12);

            const decryptedData = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                encryptedData
            );

            return decoder.decode(decryptedData);
        } catch (error) {
            console.error('Decryption failed:', error);
            return '';
        }
    }

    /**
     * Set an encrypted value in localStorage
     * @param key - The storage key
     * @param value - The value to encrypt and store
     */
    public async setItem(key: string, value: string): Promise<void> {
        const encrypted = await this.encrypt(value);
        localStorage.setItem(key, encrypted);
    }

    /**
     * Get and decrypt a value from localStorage
     * @param key - The storage key
     * @returns Decrypted value or null if not found
     */
    public async getItem(key: string): Promise<string | null> {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;

        const decrypted = await this.decrypt(encrypted);
        return decrypted || null;
    }

    /**
     * Remove an item from localStorage
     * @param key - The storage key
     */
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Clear the cached encryption key
     * Call this when changing encryption parameters
     */
    public clearCache(): void {
        this.cachedKey = null;
    }

    public clearStorage(): void {
        localStorage.clear();
    }
}

// Export singleton instance with default configuration
export const storageEncryption = new StorageEncryption();
