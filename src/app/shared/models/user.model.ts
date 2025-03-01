export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    date_joined: string;
    full_name: string;
    type: UserType;
}

export enum UserType {
    accountant = 'accountant',
    warehouse = 'warehouse',
    production_manager = 'production_manager',
    purchase_manager = 'purchase_manager'
};
