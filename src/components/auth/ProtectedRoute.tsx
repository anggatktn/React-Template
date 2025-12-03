import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/local-storage/auth-local';

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

    if (!authenticated) {
        // Redirect to login page, preserving the attempted location
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
