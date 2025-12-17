import { isAuthenticated } from "../../utils/local-storage/auth-local";
import { StateFlow } from "../../utils/StateFlow";
import type { HomeScreenState } from "./home-state";

export class HomeScreenModel {
    public readonly state = new StateFlow<HomeScreenState>({
        isLoggedIn: isAuthenticated()
    })
}