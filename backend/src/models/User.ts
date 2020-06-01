export class User {
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_role_id: number;  

    constructor (ers_username:string, ers_password: string, user_first_name: string, user_last_name: string, user_email: string, user_role_id: number) {
            this.ers_username = ers_username;
            this.ers_password = ers_password;
            this.user_first_name = user_first_name;
            this.user_last_name = user_last_name;
            this.user_email = user_email;
            this.user_role_id = user_role_id;
    }

    /**
     * creating a User instance according to database table.
     */
    static from(obj: UserTable) {
        const user = new User(
            obj.ers_username,
            obj.ers_password,
            obj.user_first_name,
            obj.user_last_name,
            obj.user_email,
            obj.user_role_id);
        return user;
    }

}

export interface UserTable {
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_role_id: number; 
}