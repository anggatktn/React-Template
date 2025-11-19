import { useNavigate } from "react-router-dom";
import classes from './index.module.less';
import { AuthScreenModel } from "./auth-screen-model";
import { useStateFlow } from "../../utils/StateFlow";
import { useMemo } from "react";
import Button, { ButtonVariant } from "../../components/dashboard/buttons";

const AuthPage: React.FC = () => {

    const model = useMemo(() => new AuthScreenModel(), []);
    const state = useStateFlow(model.state);
    const navigate = useNavigate();

    return (
        <div className={classes.background}>
            <Button text={`Clicked ${state.buttonClicked} times`} onClick={() => {
                if (state.buttonClicked >= 5) { navigate('/dashboard') } else {model.buttonClicked()}
            }} variant={ButtonVariant.PRIMARY} />
        </div>
    )
};

export default AuthPage;
