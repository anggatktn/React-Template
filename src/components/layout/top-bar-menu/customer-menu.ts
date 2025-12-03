import { BaseMenu, type MenuItem } from "./base-menu";

// Customer Menu Configuration
const CUSTOMER_MENU_CONFIG: Record<string, MenuItem> = {
    SSNLibrary: { label: "SSN Library", route: "/dashboard/ssn-lib" },
    NewOrder: { label: "New Order", route: "/dashboard/new-order" },
    OrderTracking: { label: "Order Tracking", route: "/dashboard/order-tracking" },
    FAQ: { label: "FAQ", route: "/dashboard/faq" },
    Contact: { label: "Contact", route: "/dashboard/contact" },
};

export enum CustomerMenu {
    SSNLibrary,
    NewOrder,
    OrderTracking,
    FAQ,
    Contact
}

// CustomerMenuClass extends BaseMenu
export class CustomerMenuClass extends BaseMenu {
    protected config = CUSTOMER_MENU_CONFIG;
    protected enumType = CustomerMenu;
}