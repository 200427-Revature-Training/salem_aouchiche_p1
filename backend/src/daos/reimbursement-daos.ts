
import { db } from './db';
import {Reimbursement, reimbursementTable } from '../models/Reimbursement';

// function async/wait:
export async function getAllReimbursements():Promise<Reimbursement[]> {
    // console.log('getAllReimbursements');
     //const sql = 'SELECT * FROM ERS_REIMBURSEMENT';
     /*
     const sql =`SELECT ER.REIMBURSEMENT_AMOUNT, ER.REIMBURSEMENT_SUBMITTED, ER.REIMBURSEMENT_RESOLVED, ER.REIMBURSEMENT_DESCRIPTION, 
     ER.REIMBURSEMENT_RECEIPT, ER.REIMBURSEMENT_AUTHOR, ER.REIMBURSEMENT_RESOLVER, ERS.REIMB_STATUS, ERT.REIMB_TYPE 
     FROM ERS_REIMBURSEMENT ER
     JOIN ERS_REIMBURSEMENT_STATUS ERS ON ER.REIMBURSEMENT_STATUS_ID = ERS.ERS_REIMBURSEMENT_STATUS_ID 
     LEFT JOIN ERS_REIMBURSEMENT_TYPE ERT ON ER.REIMBURSEMENT_TYPE_ID = ERT.ERS_REIMBURSEMENT_TYPE_ID `; 
        */
      
      const sql= 
    ` SELECT ER.ERS_REIMBURSEMENT_ID, ER.REIMBURSEMENT_AMOUNT, EU.USER_FIRST_NAME AS Author_FirstName, EU.USER_LAST_NAME AS Author_LastName,
      ER.REIMBURSEMENT_DESCRIPTION, ER.REIMBURSEMENT_RECEIPT, EU2.ERS_USERS_ID AS RESOLVER_ID, EU2.USER_FIRST_NAME AS resolver_FirstName, EU2.USER_LAST_NAME AS resolver_LastName,
      ER.REIMBURSEMENT_SUBMITTED, ERS.REIMB_STATUS, ERT.REIMB_TYPE 
      FROM ERS_REIMBURSEMENT ER
        LEFT JOIN ERS_REIMBURSEMENT_STATUS ERS ON ER.REIMBURSEMENT_STATUS_ID = ERS.ERS_REIMBURSEMENT_STATUS_ID 
        LEFT JOIN ERS_REIMBURSEMENT_TYPE ERT ON ER.REIMBURSEMENT_TYPE_ID = ERT.ERS_REIMBURSEMENT_TYPE_ID
        LEFT JOIN ERS_USERS EU ON EU.ERS_USERS_ID =ER.REIMBURSEMENT_AUTHOR
        LEFT JOIN ERS_USERS EU2 ON EU2.ERS_USERS_ID =ER.REIMBURSEMENT_RESOLVER `; 

    //const sql = `SELECT * FROM ERS_REIMBURSEMENT ER ;`;
     const result = await db.query<reimbursementTable>(sql,[]);
     return result.rows;
 }
/** get all employees reimbursement by id:  */
export async function getReimbursementById(reimbursementId: number): Promise<Reimbursement> {

    console.log("reimbursementId", reimbursementId); 
    const checkReimbursementExists: boolean = await reimbursementExists(reimbursementId);
   
    if (!checkReimbursementExists) {
        return undefined;
    }
    
    console.log("reimbursementId is here" ); 
    const sql =`SELECT ER.ERS_REIMBURSEMENT_ID, ER.REIMBURSEMENT_AMOUNT, ER.REIMBURSEMENT_SUBMITTED, ER.REIMBURSEMENT_RESOLVED, ER.REIMBURSEMENT_DESCRIPTION,
    ER.REIMBURSEMENT_RECEIPT, EU.ERS_USERNAME AS AUTHOR, EU1.ERS_USERNAME AS RESOLVER, ERS.REIMB_STATUS, ERT.REIMB_TYPE 
    FROM ERS_REIMBURSEMENT ER
    LEFT JOIN ERS_USERS EU ON EU.ERS_USERS_ID = ER.REIMBURSEMENT_AUTHOR
    LEFT JOIN ERS_USERS EU1 ON  EU1.ERS_USERS_ID = ER.reimbursement_resolver 
    LEFT JOIN ERS_REIMBURSEMENT_STATUS ERS ON ERS.ERS_REIMBURSEMENT_STATUS_ID = ER.REIMBURSEMENT_STATUS_ID 
    LEFT JOIN ERS_REIMBURSEMENT_TYPE ERT ON ERT.ERS_REIMBURSEMENT_TYPE_ID = ER.REIMBURSEMENT_TYPE_ID
    WHERE ER.reimbursement_author = $1`;

    const result:any = await db.query<Reimbursement>(sql, [reimbursementId]);
    console.log(result.rows); 
    return result.rows;
}

/*
    Function to check if a Reimbursement exists with a given ID
*/
export async function reimbursementExists(reimbursementId: number): Promise<boolean> {
    const sql =`SELECT EXISTS(SELECT EU.ers_users_id FROM ERS_USERS EU WHERE EU.ers_users_id = $1);`;
    const result = await db.query<Exists>(sql, [reimbursementId]);
    return result.rows[0].exists;
}

interface Exists {
    exists: boolean;
}


/*
    function save new reimbursement  from user 
 */

export async function saveReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {

    console.log("reimbursement from doas ", reimbursement); 
    const sql = ` INSERT INTO ERS_REIMBURSEMENT (REIMBURSEMENT_AMOUNT, REIMBURSEMENT_SUBMITTED, REIMBURSEMENT_RESOLVED, REIMBURSEMENT_DESCRIPTION, 
        REIMBURSEMENT_RECEIPT, REIMBURSEMENT_AUTHOR, REIMBURSEMENT_RESOLVER, REIMBURSEMENT_STATUS_ID ,REIMBURSEMENT_TYPE_ID ) VALUES
         ($1, $2, $3, $4, $5,$6, $7, $8, $9) RETURNING *`;

    const result= await db.query<Reimbursement>(sql, [
            reimbursement.reimbursement_amount,
            reimbursement.reimbursement_submitted,
            reimbursement.reimbursement_resolved, 
            reimbursement.reimbursement_description,
            reimbursement.reimbursement_receipt,   
            reimbursement.reimbursement_author,
            reimbursement.reimbursement_resolver,
            reimbursement.reimbursement_status_id,
            reimbursement.reimbursement_type_id
        ]);
 
        console.log(" the REW Reimbursement is saved"+ result.rows[0]); 

        return result.rows[0];  

}

/** Update Reimbursement status */

/** the following variables will update: 
 * * reimbursement_resolved : date that manager resolved the request 
 * * reimbursement_resolver: name og manager, 
 * * reimbursement_status_id : update from pending to approuved or deny, 
 * 
 */

 export async function updateReimbursement(reimbursement:Reimbursement):Promise<Reimbursement> {
    console.log(" reimbursement ==", reimbursement); 

    const sql=` UPDATE ERS_REIMBURSEMENT SET REIMBURSEMENT_RESOLVED = COALESCE ($1, REIMBURSEMENT_RESOLVED ), 
    REIMBURSEMENT_RESOLVER = COALESCE ($2, REIMBURSEMENT_RESOLVER), 
    REIMBURSEMENT_STATUS_ID = COALESCE ($3, REIMBURSEMENT_STATUS_ID)
    WHERE ERS_REIMBURSEMENT_ID =$4 RETURNING * `; 
    const newReimbursement_resolved = reimbursement.reimbursement_resolved && reimbursement.reimbursement_resolved.toISOString(); 

    const updatedReimbursement = [newReimbursement_resolved, reimbursement.reimbursement_resolver, reimbursement.reimbursement_status_id, reimbursement.ers_reimbursement_id]; 
    const result= await db.query<Reimbursement>(sql, updatedReimbursement);
    //console.log("result.rows[0] ", result); 

    return result.rows[0]; 
 }

