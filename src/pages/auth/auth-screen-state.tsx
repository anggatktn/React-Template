
export interface AuthScreenState {
    readonly buttonClicked: number;
    readonly authFormType: AuthFormType;
    readonly isLoading: boolean
}



export enum AuthFormType {
    SignIn,
    CreateAccount,
    EnterOTP
}