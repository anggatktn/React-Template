import type { UserFormData } from "../../../../services/models/user-management";

export interface AddUserState extends UserFormData {
    isSubmitting: boolean;
}
