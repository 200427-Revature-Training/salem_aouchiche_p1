import express, { response } from 'express';
import * as reimbursementService from '../services/reimbursement-service'; 
import bunyan from 'bunyan';
import fileUpload, { UploadedFile } from 'express-fileupload'; 
import path from 'path';  
import { error } from 'console';
import { Reimbursement } from '../models/Reimbursement'; 


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
    console.log("id = ", id); 
    //log.info('reimbursementRouter get reimbursement by user ID works !!!'); 
    try {
        const reimbursement = await reimbursementService.getReimbursementById(id);
        response.json(reimbursement);
        console.log("reimbursement = ", reimbursement); 

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
    console.log('router is here !');

    //console.log("path: ", path.resolve(__dirname), '../');
    //console.log("path: ",path.resolve("/")); 
   const reimbursement = request.body;
  // console.log(request.files)

   //console.log("request body = ", reimbursement);
   console.log("request file = ", request.files); 
   //console.log("reimbursement ", reimbursement); 
   //console.log("file ", file); 
   /* upload file */ 
   // const fileBuffer = Buffer.from(request.files);
   //const file =JSON.stringify(request.files);
   //const file =request.files;
    //const fileBuffer = Buffer.from(file);
   //const filebuffer= new Buffer(file);
    //console.log(file); 

   
   try{
        if (!request.files){
           response.send({
               message: 'No file uploaded !' 
            });
       }else{
                let reimbursement_receipt = request.files.reimbursement_receipt as UploadedFile;
                //const fileBuffer = Buffer.from(reimbursement_receipt);
                const addedPath = 'src/public/' + reimbursement_receipt.name;
                
                const newPath=`/public/` + reimbursement_receipt.name;
                console.log()
               
               // console.log("fileBuffer ",fileBuffer); 
                //console.log("path : ", path); 
                 //Use the mv() method to place the file in upload directory:   
                reimbursement_receipt.mv(addedPath, (error) => {
                if (error){
                console.error(error); 
                response.writeHead(500, {
                    'Content-type' : 'application'
                    })
                }
                
                }); 

                console.log('router is nom here !');
         
                /**
                 * create new object reimbursment with path.
                 */
            
                const newReimbursement = new Reimbursement (
             
                request.body. ers_reimbursement_id, 
                request.body.reimbursement_amount,
                request.body.reimbursement_submitted,
                request.body.reimbursement_resolved,
                request.body.reimbursement_description,
                newPath, 
                request.body.reimbursement_author,
                request.body.reimbursement_resolver,
                request.body.reimbursement_status_id,
                request.body.reimbursement_type_id
           
            );
            console.log("newReimbursement from router", newReimbursement)
            
                /** save reimbursement */
            
        const createdNewReimbursement =await reimbursementService.saveReimbursement(newReimbursement);
        response.status(201);
        response.json(createdNewReimbursement);
           
        }

    }catch(err){
        response.status(500).send(err);

    }

});


/**
 *  Patch http://localhost:3000/reimbursement/update
    Updates Reimbursement and saves them to the database.
    Returns the inserted data as JSON with status 201.
    returns status 500 otherwise.
*/

reimbursementRouter.patch('/update', (request, response,next)=> {
    console.log("request ", request.body); 

    const reimbursement= request.body; 
    reimbursementService.updateReimbursement(reimbursement)
        .then(updatedReimbursement =>{
            if(updatedReimbursement){
                response.json(updatedReimbursement);
            }else{
                response.status(201);
            }
        }).catch(err => {
            console.log(err); 
            response.sendStatus(500);
        }).finally(()=>{
            next(); 
        })    
}); 
