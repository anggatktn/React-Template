import type { User } from "../../../../services/models/user-management";

export interface UserProfileState {
    activeTab: string;
    user: User | null;
    isLoading: boolean;
    isEditing: boolean;
}
