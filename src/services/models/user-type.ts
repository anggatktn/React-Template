export enum UserType {
    Customer,
    Vendor,
    SuperAdmin,
}


export namespace UserType {
    export function getUserType(code: string) {
        switch (code) {
            case 'customer':
                return UserType.Customer;
            case 'vendor':
                return UserType.Vendor;
            case 'superadmin':
                return UserType.SuperAdmin;
            default:
                return UserType.Customer;
        }
    }

    export function getString(code: UserType) {
        switch (code) {
            case UserType.Customer:
                return 'customer';
            case UserType.Vendor:
                return 'vendor';
            case UserType.SuperAdmin:
                return 'superadmin';
            default:
                return 'customer';
        }
    }
}