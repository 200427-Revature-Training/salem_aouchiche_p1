import express from 'express';
import * as userService from '../services/user-service';
import bunyan from 'bunyan';


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

   const user = request.body;  
   
   //console.log("user"+user); 
      
   try {
        const createdNewUser =await userService.saveUser(user);
        response.status(201);
        response.json(createdNewUser);

    }catch(err){
        console.log(err);
    }
    
});
/*

 //    http://localhost:3000/users/email
 //   Retrieves a single user from the database by id
 //   If the users does not exist, sends 404
 userRouter.get('/:email/', async (request, response, next) => { 
    //const id: number = parseInt(request.params.id);
    const email:String = request.params.email; 
    console.log("emailxx" +email);   
    try {
        const user = await userService.getUserByEmail(email);  
        response.json(user); 

    } catch (err) {
        response.sendStatus(500);
        console.log(err);
        return;
    }
    next();
});
*/