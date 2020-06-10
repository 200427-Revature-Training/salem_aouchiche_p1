
import { db } from './db';
import {User, UserTable } from '../models/User';

// function async/wait:
export async function getAllUsers():Promise<User[]> {
    // console.log('getAllUsers');
     //const sql = 'SELECT * FROM ERS_USERS';

     const sql= `SELECT EU.ERS_USERNAME,EU.USER_FIRST_NAME, EU.USER_LAST_NAME, EU.USER_EMAIL, EUR.USER_ROLE 
     FROM ERS_USERS EU JOIN ERS_USER_ROLES EUR ON EU.USER_ROLE_ID= EUR.ERS_USER_ROLES_ID `; 

     const result = await db.query<UserTable>(sql,[]);
     return result.rows;
 }

export async function getUserById(userId: number): Promise<User> {
    const checkUserExists: boolean = await userExists(userId);
   
    if (!checkUserExists) {
        return undefined;
    }
    
    //const sql =`SELECT * FROM ERS_USERS WHERE ERS_USERS_ID = $1`;
    const sql= `SELECT EU.ERS_USERNAME, EU.USER_FIRST_NAME, EU.USER_LAST_NAME, EU.USER_EMAIL, EUR.USER_ROLE 
    FROM ERS_USERS EU JOIN ERS_USER_ROLES EUR ON EU.USER_ROLE_ID= EUR.ERS_USER_ROLES_ID WHERE ERS_USERS_ID = $1`; 
    const result = await db.query<User>(sql, [userId]);
    console.log(result.rows[0]); 
    return result.rows[0];
}

/*
    Function to check if a User exists with a given ID
*/
export async function userExists(userId: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT ERS_USERS_ID FROM ERS_USERS WHERE ERS_USERS_ID = $1);`;
    const result = await db.query<Exists>(sql, [userId]);
    return result.rows[0].exists;
}


/*
    function save new User  from user 
 */

export async function saveUser(user: User): Promise<User> {
    const sql = `INSERT INTO ERS_USERS (ERS_USERNAME,ERS_PASSWORD, USER_FIRST_NAME, USER_LAST_NAME, USER_EMAIL, USER_ROLE_ID) 
    VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`;
    
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

/**
 * function get user by email. 
 */

export async function getUserByEmail(userEmail:string): Promise<User> {
    console.log("userEmail --"+ userEmail ); 
    
    /** check if email already exists  */
    const verifyEmail : Boolean = await verifiedEmail(userEmail);

   
    if (!verifyEmail) {
        console.log("this email already exists! "); 
        return undefined;
    }

    //const sql =`SELECT * FROM ERS_USERS WHERE ERS_USERS_ID = $1`;
    /*
    const sql= `SELECT EU.ERS_USERS_ID, EU.ERS_USERNAME, EU.USER_FIRST_NAME, EU.USER_LAST_NAME, EU.USER_EMAIL, EU.ERS_PASSWORD, EUR.USER_ROLE 
    FROM ERS_USERS EU JOIN ERS_USER_ROLES EUR ON EU.USER_ROLE_ID= EUR.ERS_USER_ROLES_ID WHERE EU.USER_EMAIL = $1`; 
    */
    const sql= `SELECT EU.ERS_USERS_ID, EU.USER_EMAIL, EU.ERS_PASSWORD, EUR.USER_ROLE 
        FROM ERS_USERS EU JOIN ERS_USER_ROLES EUR ON EU.USER_ROLE_ID= EUR.ERS_USER_ROLES_ID WHERE EU.USER_EMAIL = $1`; 
    const result = await db.query<User>(sql, [userEmail]);
    console.log("userEmail ++"+ userEmail ); 
    console.log(result.rows[0]); 
    return result.rows[0];
}

/** verify if Email does exist return true   */
export async function verifiedEmail(userEmail:string): Promise<Boolean>{
    
    const sql = `select exists (select ers_users_email from ERS_USERS WHERE ERS_USERS_email = $1); `; 
    const result = await db.query<Exists>(sql , [userEmail]); 
    return result.rows[0].exists; 

}


/** interface of type boolean */
interface Exists {
    exists: boolean;
}

