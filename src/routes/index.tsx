import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { routeGroup, type IRouteGroup } from './group'

const PageRoutes = () => {
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        const pathName = location?.pathname

        if (pathName) {
            const targetRoute = routeGroup.find((r: IRouteGroup) => r.path === pathName)
            if (targetRoute && targetRoute.isProtected && true) {
                navigate("/")
            }
        }
    }, [location?.pathname])


    return (
        <Routes>
            {routeGroup.map((r: IRouteGroup) => {
                return <Route path={r.path} element={<r.element />} key={r.path} />
            })}
        </Routes>
    )
}

export default PageRoutes;