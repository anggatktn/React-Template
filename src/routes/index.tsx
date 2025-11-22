import { Route, Routes } from 'react-router-dom'
import { routeGroup, type IRouteGroup } from './group'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const PageRoutes = () => {
    return (
        <Routes>
            {routeGroup.map((r: IRouteGroup) => {
                const element = <r.element />;

                return (
                    <Route
                        path={r.path}
                        element={
                            r.isProtected ? (
                                <ProtectedRoute>{element}</ProtectedRoute>
                            ) : (
                                element
                            )
                        }
                        key={r.path}
                    />
                )
            })}
        </Routes>
    )
}

export default PageRoutes;