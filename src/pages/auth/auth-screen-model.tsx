import type { FormValues } from "../../components/auth/login-form";
import { authService } from "../../services/auth.service-base";
import { BaseModel } from "../../utils/base/BaseModel";
import type { BaseService } from "../../utils/base/BaseService";
import { AuthFormType, type AuthScreenState } from "./auth-screen-state";

export class AuthScreenModel extends BaseModel<AuthScreenState> {
    constructor() {
        super({
            buttonClicked: 0,
            authFormType: AuthFormType.SignIn,
            isLoading: false
        } as AuthScreenState);
    }

    protected get registeredServices(): BaseService[] {
        return [authService];
    }

    protected onLoadingStateChanged(isLoading: boolean): void {
        this.updateState(state => ({
            ...state,
            isLoading
        }));
    }

    public onFormPrimaryButtonPressed = async (
        values: FormValues,
        onSignUpOtpSuccess: () => void
    ) => {
        console.log(values)
        switch (this.state.getValue().authFormType) {
            case AuthFormType.SignIn:
                await this.handleSignIn(values)
                break
            case AuthFormType.CreateAccount:
                await this.handleSignUp(values)
                break
            case AuthFormType.EnterOTP:
                onSignUpOtpSuccess()
                return
        }
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

    private async handleSignIn(values: FormValues) {
        authService.signIn({
            email: values.email || "",
            password: values.password || ""
        }).then((response) => {
            if (response.success) {
                this.state.setValue({
                    ...this.state.getValue(),
                    authFormType: AuthFormType.EnterOTP
                })
            }
        })
    }

    private async handleSignUp(values: FormValues) {
        authService.signUp({
            email: values.email || "",
            password: values.password || ""
        }).then((response) => {
            if (response.success) {
                this.state.setValue({
                    ...this.state.getValue(),
                    authFormType: AuthFormType.EnterOTP
                })
            }
        })
    }

    private handleVerifyOtp = (values: FormValues) => {

    }

    private handleResendOtp = (values: FormValues) => {

    }
}