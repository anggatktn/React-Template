import React from "react"
import HomePage from "../pages/home"
import AuthPage from "../pages/auth"

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
    }
]

export { type IRouteGroup, routeGroup }