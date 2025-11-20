import type { FormValues } from "../../components/auth/login-form";
import { StateFlow } from "../../utils/StateFlow";
import type { AuthScreenState } from "./auth-screen-state";

export class AuthScreenModel {

    public readonly state : StateFlow<AuthScreenState> = new StateFlow({
        buttonClicked: 0
    });

    buttonClicked() {
        this.state.setValue({
            ...this.state.getValue(),
            buttonClicked: this.state.getValue().buttonClicked + 1
        });
    }

    onFormFinished(values: FormValues){
        
    }
}