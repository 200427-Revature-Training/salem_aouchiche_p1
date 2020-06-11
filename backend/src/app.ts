import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import bunyan from 'bunyan'; 
import {userRouter} from './routers/user-router';
import { reimbursementRouter } from './routers/reimbursement-router';
import cors from 'cors'; 
import fileUpload from 'express-fileupload'; 
import path from 'path'; 

//import{userEmail} from '.'


const app = express();
const log = bunyan.createLogger({name: "Project_P1"});
const port = process.env.port || 3000;

app.set('port', port);
app.use(cors()); 
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname , 'public'))); 
//app.use(fileUpload());
app.use(fileUpload({
    createParentPath:true
})); 
app.use(bodyParser.urlencoded({extended: true}));

log.warn('server started');

/* Routers*/
app.use('/users', userRouter);
app.use('/reimbursement', reimbursementRouter); 

process.on('unhandledRejection', () => {
    db.end().then(() => {
        log.warn('something is wrong! Database pool closed');
    });
});


app.listen(port, () => {
    console.log(`Expense Reimbursement System APP is running at http://localhost:${port}`);
    log.info('server is listenning!'); 
});