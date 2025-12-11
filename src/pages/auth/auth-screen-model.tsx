import type { FormValues } from "../../components/auth/login-form/LoginForm";
import { authService } from "../../services/auth-service";
import { BaseModel } from "../../utils/base/BaseModel";
import type { BaseService } from "../../utils/base/BaseService";
import { AuthFormType, type AuthScreenState } from "./auth-screen-state";
import { getUserType, setAuthToken, setUser, setUserType } from "../../utils/local-storage/auth-local";
import type { NavigateFunction } from "react-router-dom";
import { UserType } from "../../services/models/user-type";

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
        const userType = getUserType();
        console.log(`${userType} User Type`);
        authService.signIn({
            email: values.email || "",
            otp: values.otp || ""
        }).then(async (response) => {
            if (response.data?.token) {
                // Save the authentication token
                setAuthToken(response.data.token);
                this.handleGetUserProfile();
            }
        }).catch((error) => {
            console.log("Sign in failed");
        })
    }

    private handleGetUserProfile = async () => {
        authService.getCurrentUser().then(async (response) => {
            if (response.data) {
                setUser(response.data);
                if (response.data.status === "pending-business-profile" && getUserType() === UserType.Customer) {
                    this.navigate?.('/profile/complete');
                } else {
                    this.navigate?.('/dashboard');
                }
            }
        }).catch(async () => {
            console.log("Failed to get user profile");
        })
    }
}