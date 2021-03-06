import { Reimbursement } from '../models/Reimbursement';
import * as reimbursementdao from '../daos/reimbursement-daos'
import { json } from 'body-parser';
import { response } from 'express';
import { rejects } from 'assert';
import { error } from 'console';

export function getAllReimbursements(): Promise<Reimbursement[]> {
    return reimbursementdao.getAllReimbursements();
}

export function getReimbursementById(id: number): Promise<Reimbursement> {
    return reimbursementdao.getReimbursementById(id);
}


export function  saveReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    console.log("reimbursement from save service ", reimbursement);
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

         console.log(newReimbursement);

    if(newReimbursement.reimbursement_amount&& newReimbursement.reimbursement_author 
        &&newReimbursement.reimbursement_description &&
         newReimbursement.reimbursement_receipt &&newReimbursement.reimbursement_status_id &&
        newReimbursement.reimbursement_submitted  && newReimbursement.reimbursement_type_id) {
        // submit to DAO
        return reimbursementdao.saveReimbursement(newReimbursement);  

    } else {
    
        // probably issue some kind of 400
        return new Promise((resolve, reject) => reject(422));
    }
}


export function updateReimbursement(reimbursement:Reimbursement):Promise<Reimbursement>{
    //console.log("updateReimbursement service "); 
    const newreimbursement_resolved= reimbursement.reimbursement_resolved && new Date(reimbursement.reimbursement_resolved); 
    //console.log("newreimbursement_resolved ", newreimbursement_resolved); 

    const newReimbursement = new Reimbursement(
        reimbursement.ers_reimbursement_id,
        reimbursement.reimbursement_amount, 
        reimbursement.reimbursement_submitted, 
        newreimbursement_resolved, 
        reimbursement.reimbursement_description,
        reimbursement.reimbursement_receipt,
        reimbursement.reimbursement_author,
        reimbursement.reimbursement_resolver,
        reimbursement.reimbursement_status_id,
        reimbursement.reimbursement_type_id

        ); 
        
    if (!reimbursement.ers_reimbursement_id){
        throw new Error('400');

    }
    // console.log("newReimbursement ", newReimbursement); 
    return reimbursementdao.updateReimbursement(newReimbursement); 
    
} 