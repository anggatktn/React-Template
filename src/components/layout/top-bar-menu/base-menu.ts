// Base MenuItem interface
export interface MenuItem {
    label: string;
    route: string;
}

// Abstract BaseMenu class (like Kotlin abstract class)
export abstract class BaseMenu {
    protected abstract config: Record<string, MenuItem>;
    protected abstract enumType: any;

    getLabel(menu: number): string {
        const key = this.enumType[menu];
        return this.config[key]?.label || "";
    }

    getRoute(menu: number): string {
        const key = this.enumType[menu];
        return this.config[key]?.route || "";
    }

    getMenuEnum(): any {
        return this.enumType;
    }
}