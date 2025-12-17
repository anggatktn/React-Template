import React from "react"
import HomePage from "../pages/home"
import ProfileCompletePage from "../pages/profile/complete"
import OrdersPage from "../vendor/pages/orders"
import VendorHistoryPage from "../vendor/pages/history"
import OrderDetails from "../vendor/pages/orders/details/OrderDetails"
import SSNLibraryPage from "../pages/dashboard/ssn-lib/landing"
import NewSSNPage from "../pages/dashboard/ssn-lib/new"
import NewOrderPage from "../pages/dashboard/new-order/landing"
import CheckoutPage from "../pages/dashboard/new-order/checkout"
import OrderTrackingPage from "../pages/dashboard/order-tracking"
import OrderDetailsPage from "../pages/dashboard/order-tracking/details"
import UserListPage from "../pages/dashboard/user-management/user-list"
import AddUserPage from "../pages/dashboard/user-management/add-user"
import ViewEditUserPage from "../pages/dashboard/user-management/view-edit-user"
import DashboardPage from "../pages/dashboard"

interface IRouteGroup {
    path: string,
    element: React.FC,
    isProtected: boolean
}

const routeGroup: IRouteGroup[] = [
    {
        path: '/',
        element: HomePage,
        isProtected: false
    },
    {
        path: '/profile/complete',
        element: ProfileCompletePage,
        isProtected: true
    },
    {
        path: '/dashboard',
        element: DashboardPage,
        isProtected: true
    },
    {
        path: '/dashboard/ssn-lib',
        element: SSNLibraryPage,
        isProtected: true
    },
    {
        path: '/dashboard/ssn-lib/new',
        element: NewSSNPage,
        isProtected: true
    },
    {
        path: '/dashboard/new-order',
        element: NewOrderPage,
        isProtected: true
    },
    {
        path: '/dashboard/new-order/checkout',
        element: CheckoutPage,
        isProtected: true
    },
    {
        path: '/dashboard/order-tracking',
        element: OrderTrackingPage,
        isProtected: true
    },
    {
        path: '/dashboard/order-tracking/:id',
        element: OrderDetailsPage,
        isProtected: true
    },
    {
        path: '/dashboard/user-management',
        element: UserListPage,
        isProtected: true
    },
    {
        path: '/dashboard/user-management/add-user',
        element: AddUserPage,
        isProtected: true
    },
    {
        path: '/dashboard/user-management/view-edit-user/:userId',
        element: ViewEditUserPage,
        isProtected: true
    },
    {
        path: '/vendor/orders',
        element: OrdersPage,
        isProtected: true
    },
    {
        path: '/vendor/orders/:id',
        element: OrderDetails,
        isProtected: true
    },
    {
        path: '/vendor/history',
        element: VendorHistoryPage,
        isProtected: true
    }
]

export { type IRouteGroup, routeGroup }