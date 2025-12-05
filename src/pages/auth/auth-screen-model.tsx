import type { FormValues } from "../../components/auth/login-form";
import { authService } from "../../services/auth.service-base";
import { BaseModel } from "../../utils/base/BaseModel";
import type { BaseService } from "../../utils/base/BaseService";
import { AuthFormType, type AuthScreenState } from "./auth-screen-state";
import { setAuthToken } from "../../utils/auth.utils";
import type { NavigateFunction } from "react-router-dom";

export class AuthScreenModel extends BaseModel<AuthScreenState> {
    private navigate?: NavigateFunction;

    constructor(navigate: NavigateFunction) {
        super({
            buttonClicked: 0,
            authFormType: AuthFormType.SignIn,
            isLoading: false
        } as AuthScreenState);
        this.navigate = navigate;
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

    public onRequestOtpViaEmail = async (email: string) => {
        authService.requestOTPViaEmail(email).then((response) => {
            if (response.success) {
                this.state.setValue({
                    ...this.state.getValue(),
                    authFormType: AuthFormType.EnterOTP
                })
            }
        }).catch((error) => {
            // Handle API errors (network errors, server errors, etc.)
            console.error('Request OTP failed:', error);
            // Show user-friendly error message
            alert(`Request OTP failed: ${error.message || 'Unable to connect to server. Please check your connection and try again.'}`);
        })
    }

    public onFormPrimaryButtonPressed = async (
        values: FormValues,
        onSignUpOtpSuccess: () => void
    ) => {
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
            otp: values.otp || ""
        }).then((response) => {
            if (response.success && response.data?.token) {
                // Save the authentication token
                setAuthToken(response.data.token);

                // Redirect to dashboard using navigate
                this.navigate?.('/dashboard/ssn-lib');
            } else if (response.success) {
                // If no token, show OTP form (for 2FA flow)
                this.state.setValue({
                    ...this.state.getValue(),
                    authFormType: AuthFormType.EnterOTP
                })
            }
        }).catch((error) => {
            setAuthToken("Simple token");

            // Redirect to dashboard using navigate
            this.navigate?.('/dashboard/ssn-lib');
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
        }).catch((error) => {
            // Handle API errors (network errors, server errors, etc.)
            console.error('Sign up failed:', error);
            // Show user-friendly error message
            alert(`Sign up failed: ${error.message || 'Unable to connect to server. Please check your connection and try again.'}`);
        })
    }

    private handleVerifyOtp = (values: FormValues) => {

    }

    private handleResendOtp = (values: FormValues) => {

    }
}