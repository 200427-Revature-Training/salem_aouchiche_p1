import express from 'express';
import * as reimbursementService from '../services/reimbursement-service'; 
import bunyan from 'bunyan';

export const reimbursementRouter = express.Router();

const log = bunyan.createLogger({name: "myProject_P1"});

    /** 
     * http://localhost:3000/Reimbursement
       Retrieves an array of reimbursement from database
     */ 

    reimbursementRouter.get('', async(request, response, next)=>{
    await reimbursementService.getAllReimbursements().then(reimbursement =>{
        response.set('content-type', 'application/json');
        response.json(reimbursement);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

 /**
  *  http://localhost:3000/reimbursement/1
     Retrieves a single reimbursement from the database by id
     If the users does not exist, sends 404
    */ 

    reimbursementRouter.get('/:id/', async (request, response, next) => {
    //log.info('userRouter works, users(id).'); 
    const id: number = parseInt(request.params.id);
    log.info('reimbursementRouter get reimbursement by ID works !!!'); 
    try {

        const reimbursement = await reimbursementService.getReimbursementById(id);
        response.json(reimbursement); 

    } catch (err) {
        response.sendStatus(500);
        console.log(err);
        return;
    }
    next();
});

/*   POST http://localhost:3000/reimbursement
    Creates a New Reimbursement and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/

reimbursementRouter.post('', async(request, response, next) => {

   const reimbursement = request.body;  
      
   try {
        const createdNewReimbursement =await reimbursementService.saveReimbursement(reimbursement);
        response.status(201);
        response.json(createdNewReimbursement);

    }catch(err){
        console.log(err);
    }
    
});