import type { User } from "../../../../services/models/user-management";

export interface UserListState {
    sortBy: string;
    searchValue: string;
    userList: User[];
}
