import { User } from '../models/User';
import * as userdao from '../daos/user-daos'
import { json } from 'body-parser';

export function getAllUsers(): Promise<User[]> {
    return userdao.getAllUsers();
}


export function getUserById(id: number): Promise<User> {
    return userdao.getUserById(id);
}

export function getUserByEmail(email:string): Promise<User> {
    return userdao.getUserByEmail(email); 

}

export function saveUser(user: User): Promise<User> {
    console.log(JSON.stringify(user))
    // add new user from the users:
    const newUser = new User(
        user.ers_username,
        user.ers_password,
        user.user_first_name,
        user.user_last_name,
        user.user_email,
        user.user_role_id
        ); 
        

    if(newUser.user_first_name&&newUser.user_last_name && newUser.ers_username && newUser.user_email&& newUser.ers_password &&newUser.user_role_id) {
        // submit to DAO
        return userdao.saveUser(newUser);  

    } else {
        // probably issue some kind of 400
        return new Promise((resolve, reject) => reject(422));
    }
}


