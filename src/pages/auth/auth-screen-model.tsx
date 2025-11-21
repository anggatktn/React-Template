import type { FormValues } from "../../components/auth/login-form";
import { StateFlow } from "../../utils/StateFlow";
import { AuthFormType, type AuthScreenState } from "./auth-screen-state";

export class AuthScreenModel {
    public readonly state: StateFlow<AuthScreenState> = new StateFlow({
        buttonClicked: 0,
        authFormType: AuthFormType.SignIn,
        isLoading: false
    } as AuthScreenState);

    public onFormPrimaryButtonPressed = (values: FormValues, onSignUpOtpSuccess: () => void) => {
        console.log(values)
        var newFormType: AuthFormType = AuthFormType.SignIn
        switch (this.state.getValue().authFormType) {
            case AuthFormType.SignIn:
                console.log("Sign In")
                break
            case AuthFormType.CreateAccount:
                newFormType = AuthFormType.EnterOTP
                break
            case AuthFormType.EnterOTP:
                onSignUpOtpSuccess()
                return
                break
        }
        this.state.setValue({
            ...this.state.getValue(),
            authFormType: newFormType
        })
    }

    public onFormSecondaryButtonPressed = () => {
        console.log(this.state.getValue().authFormType)
        var newFormType: AuthFormType = AuthFormType.SignIn
        switch (this.state.getValue().authFormType) {
            case AuthFormType.SignIn:
                newFormType = AuthFormType.CreateAccount
                break
            case AuthFormType.CreateAccount:
                newFormType = AuthFormType.SignIn
                break
            case AuthFormType.EnterOTP:
                newFormType = AuthFormType.CreateAccount
                break
        }
        this.state.setValue({
            ...this.state.getValue(),
            authFormType: newFormType
        })
    }

    public onRetypeEmail = () => {
        this.state.setValue({
            ...this.state.getValue(),
            authFormType: AuthFormType.CreateAccount
        })
    }
}