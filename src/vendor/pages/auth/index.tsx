import { useNavigate } from "react-router-dom";
import classes from './index.module.less';
import LoginForm from "../../components/auth/LoginForm";
import { AuthScreenModel } from "./auth-screen-model";
import { useStateFlow } from "../../../utils/StateFlow";
import { useMemo } from "react";

const AuthPage: React.FC = () => {

    const model = useMemo(() => new AuthScreenModel(), []);
    const state = useStateFlow(model.state);
    const navigate = useNavigate();

    return (
        <div className={classes.background}>
            <div className={classes.container}>
                <div className={classes.leftPanel}>
                    <div className={classes.logo}>GEAR TURF TECHNOLOGY</div>
                    <div className={classes.heroText}>
                        Order your RFID tags<br />
                        with us Easier and Faster
                    </div>
                    <div className={classes.footer}>Vendor</div>
                </div>
                <div className={classes.rightPanel}>
                    <LoginForm
                        onLogin={() => {
                            model.buttonClicked();
                            if (state.buttonClicked >= 0) {
                                navigate('/dashboard');
                            }
                        }}
                        onRegister={() => {
                            console.log("Register clicked");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
