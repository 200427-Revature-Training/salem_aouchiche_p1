import { Reimbursement } from '../models/Reimbursement';
import * as reimbursementdao from '../daos/reimbursement-daos'
import { json } from 'body-parser';

export function getAllReimbursements(): Promise<Reimbursement[]> {
    return reimbursementdao.getAllReimbursements();
}

export function getReimbursementById(id: number): Promise<Reimbursement> {
    return reimbursementdao.getReimbursementById(id);
}


export function  saveReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    console.log(JSON.stringify(reimbursement))
    // add new user from the Reimbursements:
    const newReimbursement = new Reimbursement(
        reimbursement.ers_reimbursement_id,
        reimbursement.reimbursement_amount, 
        reimbursement.reimbursement_submitted, 
        reimbursement.reimbursement_resolved, 
        reimbursement.reimbursement_description,
        reimbursement.reimbursement_receipt,
        reimbursement.reimbursement_author,
        reimbursement.reimbursement_resolver,
        reimbursement.reimbursement_status_id,
        reimbursement.reimbursement_type_id

        ); 
        

    if(newReimbursement.reimbursement_amount&& newReimbursement.reimbursement_author &&newReimbursement.reimbursement_description &&
         newReimbursement.reimbursement_receipt && newReimbursement.reimbursement_resolved &&newReimbursement.reimbursement_status_id &&
        newReimbursement.reimbursement_submitted  && newReimbursement.reimbursement_type_id) {
        // submit to DAO
        return reimbursementdao.saveReimbursement(newReimbursement);  

    } else {
        // probably issue some kind of 400
        return new Promise((resolve, reject) => reject(422));
    }
}