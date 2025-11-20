import { useNavigate } from "react-router-dom"
import classes from "./index.module.less"
import { HomeScreenModel } from "./home-model"
import { useMemo } from "react"
import { useStateFlow } from "../../utils/StateFlow"
import AuthPage from "../auth"

const HomePage = () => {
    const navigate = useNavigate()
    const navigateToDashboard = () => {
        navigate("/dashboard/overview")
    }
    const screenModel = useMemo(() => new HomeScreenModel(), []);
    const state = useStateFlow(screenModel.state);

    if (state.isLoggedIn) {
        return (<div>
            <span>Test</span>
        </div>)
    } else return (<AuthPage />)
}

export default HomePage