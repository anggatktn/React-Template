import { BaseMenu, type MenuItem } from "./base-menu";

// Vendor Menu Configuration
export const VENDOR_MENU_CONFIG: Record<string, MenuItem> = {
    Orders: { label: "Orders", route: "/vendor/orders" },
    History: { label: "History", route: "/vendor/history" },
    FAQ: { label: "FAQ", route: "/vendor/faq" },
    Contact: { label: "Contact", route: "/vendor/contact" },
};

export enum VendorMenu {
    Orders,
    History,
    FAQ,
    Contact
}

// VendorMenuClass extends BaseMenu
export class VendorMenuClass extends BaseMenu {
    protected config = VENDOR_MENU_CONFIG;
    protected enumType = VendorMenu;
}
