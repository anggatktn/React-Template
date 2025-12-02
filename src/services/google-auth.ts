import { auth } from '../utils/firebase-config';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';

/**
 * Sign in with Google using Firebase Authentication
 * @returns Promise with UserCredential containing user info and tokens
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);

        // Get the Google Access Token
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info
        const user = result.user;

        console.log('Google Sign-In successful:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            token
        });

        return result;
    } catch (error: any) {
        // Handle Errors
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error('Google Sign-In error:', {
            code: errorCode,
            message: errorMessage
        });

        throw error;
    }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
    try {
        await firebaseSignOut(auth);
        console.log('User signed out successfully');
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
};

/**
 * Get the currently signed-in user
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};
