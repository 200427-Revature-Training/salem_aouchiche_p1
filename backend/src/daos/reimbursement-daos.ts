
import { db } from './db';
import {Reimbursement, reimbursementTable } from '../models/Reimbursement';

// function async/wait:
export async function getAllReimbursements():Promise<Reimbursement[]> {
    // console.log('getAllReimbursements');
     //const sql = 'SELECT * FROM ERS_REIMBURSEMENT';
     const sql =`SELECT ER.REIMBURSEMENT_AMOUNT, ER.REIMBURSEMENT_SUBMITTED, ER.REIMBURSEMENT_RESOLVED, ER.REIMBURSEMENT_DESCRIPTION, ER.REIMBURSEMENT_RECEIPT, 
     ER.REIMBURSEMENT_AUTHOR, ER.REIMBURSEMENT_RESOLVER,  ERS.REIMB_STATUS, ERT.REIMB_TYPE 
     FROM ERS_REIMBURSEMENT ER
     JOIN ERS_REIMBURSEMENT_STATUS ERS ON ER.REIMBURSEMENT_STATUS_ID = ERS.ERS_REIMBURSEMENT_STATUS_ID 
     LEFT JOIN ERS_REIMBURSEMENT_TYPE ERT ON ER.REIMBURSEMENT_TYPE_ID = ERT.ERS_REIMBURSEMENT_TYPE_ID `; 

    //const sql = `SELECT * FROM ERS_REIMBURSEMENT ER ;`;
     const result = await db.query<reimbursementTable>(sql,[]);
     return result.rows;
 }

export async function getReimbursementById(reimbursementId: number): Promise<Reimbursement> {
    const checkReimbursementExists: boolean = await reimbursementExists(reimbursementId);
   
    if (!checkReimbursementExists) {
        return undefined;
    }
    
    const sql =`SELECT * FROM ERS_REIMBURSEMENT WHERE ERS_REIMBURSEMENT_ID = $1`;
    const result = await db.query<Reimbursement>(sql, [reimbursementId]);
    console.log(result.rows[0]); 
    return result.rows[0];
}

/*
    Function to check if a Reimbursement exists with a given ID
*/
export async function reimbursementExists(reimbursementId: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT ERS_REIMBURSEMENT_ID FROM ERS_REIMBURSEMENT WHERE ERS_REIMBURSEMENT_ID = $1);`;
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