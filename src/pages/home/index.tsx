import { useNavigate } from "react-router-dom"
import classes from "./index.module.less"
import { HomeScreenModel } from "./home-model"
import { useEffect, useMemo } from "react"
import { useStateFlow } from "../../utils/StateFlow"
import AuthPage from "../auth"

const HomePage = () => {
    const navigate = useNavigate()
    const screenModel = useMemo(() => new HomeScreenModel(), []);
    const state = useStateFlow(screenModel.state);

    useEffect(() => {
        if (state.isLoggedIn) {
            navigate("/dashboard/ssn-lib")
        }
    }, [state.isLoggedIn, navigate])

    if (state.isLoggedIn) {
        return null; // Will redirect via useEffect
    }

    return (<AuthPage />)
}

export default HomePage