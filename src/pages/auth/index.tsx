import { useNavigate } from "react-router-dom";
import classes from './index.module.less';
import { AuthScreenModel } from "./auth-screen-model";
import { useStateFlow } from "../../utils/StateFlow";
import { useMemo } from "react";
import LoginForm, { type FormValues } from "../../components/auth/login-form";

const AuthPage: React.FC = () => {

    const model = useMemo(() => new AuthScreenModel(), []);
    const state = useStateFlow(model.state);
    const navigate = useNavigate();

    return (
        <div className={classes["container"]}>
            <div className={classes["left-pane"]}>
                <div className={classes["wrap-logo"]}>
                    <img src='/images/rfid-logo.svg' alt='Logo' className={classes['logo']} />
                </div>
                <span style={{
                    display: "flex",
                    flexGrow: 1,
                    alignItems: "center",
                    fontSize: 42,
                    color: 'white'
                }}>Order your RFID tags<br />with us Easier and Faster</span>
                <span style={{
                    fontSize: 18,
                    fontWeight: 300
                }}>
                    <span className={classes["term"]}>Customer</span>
                    <span className={classes["term"]}>Vendor</span>
                    <span className={classes["term"]}>Super Admin</span>
                </span>
            </div>
            <div className={classes["right-pane"]}>
                <LoginForm
                    onPrimaryButtonClicked={model.onFormPrimaryButtonPressed}
                    onSecondaryButtonClicked={model.onFormSecondaryButtonPressed}
                    formType={state.authFormType}
                    onRetypeEmail={model.onRetypeEmail}
                    isLoading={false}
                />
            </div>
        </div>
    )
};

export default AuthPage;
