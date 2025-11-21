import React from "react"
import HomePage from "../pages/home"
import ProfileCompletePage from "../pages/profile-complete"

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
    }
]

export { type IRouteGroup, routeGroup }