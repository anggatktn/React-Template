import { StateFlow } from "../../utils/StateFlow";
import type { HomeScreenState } from "./home-state";

export class HomeScreenModel {
    public readonly state = new StateFlow<HomeScreenState>({
        isLoggedIn: false
    })
}