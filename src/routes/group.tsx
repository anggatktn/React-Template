import React from "react"
import HomePage from "../pages/home"
import ProfileCompletePage from "../pages/profile-complete"
import OrdersPage from "../vendor/pages/orders"
import OrderDetails from "../vendor/pages/orders/details/OrderDetails"

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
        isProtected: false
    },
    {
        path: '/vendor/orders',
        element: OrdersPage,
        isProtected: false
    },
    {
        path: '/vendor/orders/:id',
        element: OrderDetails,
        isProtected: false
    }
]

export { type IRouteGroup, routeGroup }