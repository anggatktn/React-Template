import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isProfileCompleted } from '../../utils/local-storage/auth-local';

interface ProtectedRouteProps {
    children: React.ReactElement;
    redirectTo?: string;
}

/**
 * ProtectedRoute component
 * Wraps routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo = '/'
}) => {
    const location = useLocation();
    const authenticated = isAuthenticated();
    const profileCompleted = isProfileCompleted();

    if (!authenticated) {
        // Redirect to login page, preserving the attempted location
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // If authenticated but profile not completed, redirect to profile completion page
    // But allow access to the profile completion page itself to avoid redirect loop
    if (!profileCompleted && location.pathname !== '/profile/complete') {
        return <Navigate to="/profile/complete" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
