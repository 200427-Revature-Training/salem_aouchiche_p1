
import { db } from './db';
import {User, UserTable } from '../models/User';

// function async/wait:
export async function getAllUsers():Promise<User[]> {
    // console.log('getAllUsers');
     const sql = 'SELECT * FROM courses';
     const result = await db.query<UserTable>(sql,[]);
     return result.rows;
 }

export async function getUserById(userId: number): Promise<User> {
    const checkUserExists: boolean = await userExists(userId);
   
    if (!checkUserExists) {
        return undefined;
    }
    
    const sql =`SELECT * FROM USERS WHERE USERS_ID = $1`;
    const result = await db.query<User>(sql, [userId]);
    console.log(result.rows[0]); 
    return result.rows[0];
}

/*
    Function to check if a User exists with a given ID
*/
export async function userExists(userId: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT id FROM USERS WHERE USERS_ID = $1);`;
    const result = await db.query<Exists>(sql, [userId]);
    return result.rows[0].exists;
}

interface Exists {
    exists: boolean;
}


/*
    function save new User  from user 
 */

export async function saveUser(user: User): Promise<User> {
    const sql = `INSERT INTO USERS(ERS_USERNAME,ERS_PASSWORD, USER_FIRST_NAME, USER_LAST_NAME, USER_EMAIL, USER_ROLE_ID) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`;
    const result= await db.query<User>(sql, [
        user.ers_username,
        user.ers_password,
        user.user_first_name,
        user.user_last_name,
        user.user_email,
        user.user_role_id
]);
 console.log(" the User is saved"+ result.rows[0]); 
return result.rows[0];  

}


