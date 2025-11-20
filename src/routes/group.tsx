import React from "react"
import AuthPage from "../vendor/pages/auth"
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
        element: AuthPage,
        isProtected: false
    },
    {
        path: '/dashboard',
        element: OrdersPage,
        isProtected: false
    },
    {
        path: '/dashboard/orders/:id',
        element: OrderDetails,
        isProtected: false
    }
]

export { type IRouteGroup, routeGroup }