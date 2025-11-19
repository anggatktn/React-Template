import { useNavigate } from "react-router-dom"
import classes from "./index.module.less"

const HomePage = () => {
    const navigate = useNavigate()
    const navigateToDashboard = () => {
        navigate("/dashboard/overview")
    }
    return (
        <div className={classes["home-root"]}>
            <button onClick={navigateToDashboard}>
                <span>Navigate to Dashboard</span>
            </button>
        </div>
    )
}

export default HomePage