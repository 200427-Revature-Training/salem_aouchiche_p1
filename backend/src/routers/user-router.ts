import express from 'express';
import * as userService from '../services/user-service';
import bunyan from 'bunyan';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import { json } from 'body-parser';


export const userRouter = express.Router();
const log = bunyan.createLogger({name: "myProject_P1"});

    //  http://localhost:3000/Users
    // Retrieves an array of Users from database

userRouter.get('', async(request, response, next)=>{
    await userService.getAllUsers().then(users =>{
        response.set('content-type', 'application/json');
        response.json(users);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});



 //    http://localhost:3000/users/1
 //   Retrieves a single user from the database by id
 //   If the users does not exist, sends 404
    userRouter.get('/:id/', async (request, response, next) => {
    //log.info('userRouter works, users(id).'); 
    const id: number = parseInt(request.params.id);
    log.info('userRouter get users by ID works !!!'); 
    try {

        const user = await userService.getUserById(id);

        response.json(user); 

    } catch (err) {
        response.sendStatus(500);
        console.log(err);
        return;
    }
    next();
});


/*   POST http://localhost:3000/users
    Creates a new user and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/



userRouter.post('', async(request, response, next) => {

   //const user = request.body;  
   //console.log("user.body"+ JSON.stringify(request.body)); 
   //console.log("user: "+ user); 

    /* hash password */ 
    const saltRounds = 2; 
    const  salt = bcrypt.genSaltSync(saltRounds); 
    const hashedPassword=bcrypt.hashSync(request.body.ers_password, salt);
    console.log("hashedPassword" +hashedPassword);
    console.log("salt" +salt);  
    console.log("salt" +salt.length + " hash"+ hashedPassword.length );  

   
   const user:any= {
        ers_username: request.body.ers_username, 
        ers_password:hashedPassword, 
        user_first_name:request.body.user_first_name, 
        user_last_name:request.body.user_last_name, 
        user_email:request.body.user_email,
        user_role_id:request.body.user_role_id
   }
   
   try {
        const createdNewUser =await userService.saveUser(user);
        response.status(201);
        response.json(createdNewUser);

    }catch(err){
        console.log(err);
    }
    
});

 //    http://localhost:3000/users/user/email
 //   Retrieves a single user from the database by id
 //   If the users does not exist, sends 404

 userRouter.get('/user/:email', async (request, response, next) => { 
    const email = request.params.email; 
    console.log("email here:  = " +email);   
    try {
        const user:any = await userService.getUserByEmail(email);  
        //console.log("user here:  = " +JSON.stringify(user));
        const userHashedPassword= user.ers_password;
        //console.log('userHashedPassworers_users_idd'+userHashedPassword);  
        const userId =user.ers_users_id;
        console.log("userId  "+userId); 
        console.log('request'+request.body.ers_password);
        const testHash = bcrypt.compareSync(request.body.ers_password, userHashedPassword);  
        console.log('testHash'+testHash); 
        console.log('userHashedPassword'+userHashedPassword); 
        
         if(testHash){
            const token= jwt.sign({ers_users_id:userId},"qwertyuiop",{expiresIn:"1h"})
            console.log("token "+token);
            response.json(
                {token, 
                 user_role:user.user_role,
                 userId:user.ers_users_id
            });  
        }else {
            response.json(""); 
        }
        
      

    } catch (err) {
        response.sendStatus(500);
        console.log(err);
        return;
    }
    next();
});
