import { BaseMenu, type MenuItem } from "./base-menu";

// SuperAdmin Menu Configuration
const SUPERADMIN_MENU_CONFIG: Record<string, MenuItem> = {
    Orders: { label: "Orders", route: "/dashboard/new-order" },
    UserManagement: { label: "User Management", route: "/dashboard/user-management" },
    Messages: { label: "Messages", route: "/dashboard/messages" },
    Contact: { label: "Contact", route: "/dashboard/contact" },
};

export enum SuperAdminMenu {
    Orders,
    UserManagement,
    Messages,
    Contact
}

// SuperAdminMenuClass extends BaseMenu
export class SuperAdminMenuClass extends BaseMenu {
    protected config = SUPERADMIN_MENU_CONFIG;
    protected enumType = SuperAdminMenu;
}