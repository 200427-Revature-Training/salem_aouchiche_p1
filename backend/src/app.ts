import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import bunyan from 'bunyan'; 
import {userRouter} from './routers/user-router';


const app = express();
const log = bunyan.createLogger({name: "Project_P1"});
const port = process.env.port || 3000;

app.set('port', port);
app.use(bodyParser.json());

log.warn('server started');

/* Routers*/
app.use('/users', userRouter);


process.on('unhandledRejection', () => {
    db.end().then(() => {
        log.warn('something is wrong! Database pool closed');
    });
});


app.listen(port, () => {
    console.log(`Expense Reimbursement System APP is running at http://localhost:${port}`);
    log.info('server is listenning!'); 
});