import { UserType } from "../../../services/models/user-type";
import { CustomerMenuClass } from "./customer-menu";
import { SuperAdminMenuClass } from "./super-admin-menu";
import { BaseMenu } from "./base-menu";

// Abstraction: Map UserType to Menu instance (polymorphic!)
export const MENU_BY_USER_TYPE: Record<UserType, BaseMenu> = {
    [UserType.SuperAdmin]: new SuperAdminMenuClass(),
    [UserType.Customer]: new CustomerMenuClass(),
    [UserType.Vendor]: new CustomerMenuClass(), // Placeholder until Vendor menu is implemented
};
