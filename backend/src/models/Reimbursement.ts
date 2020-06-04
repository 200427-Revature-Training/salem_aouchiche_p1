export class Reimbursement {

    ers_reimbursement_id?:       number; 
    reimbursement_amount:       number; 
    reimbursement_submitted:    Date;  
    reimbursement_resolved :    Date;
    reimbursement_description:  string;
    reimbursement_receipt:      string; 
    reimbursement_author :      number; 
    reimbursement_resolver:     string; 
    reimbursement_status_id:    number; 
    reimbursement_type_id :     number; 

    constructor(    
        ers_reimbursement_id:       number, 
        reimbursement_amount:       number, 
        reimbursement_submitted:    Date,  
        reimbursement_resolved :    Date,
        reimbursement_description:  string,
        reimbursement_receipt:      string, 
        reimbursement_author :      number, 
        reimbursement_resolver:     string, 
        reimbursement_status_id:    number, 
        reimbursement_type_id :     number, ) 
        {
            this.ers_reimbursement_id       = ers_reimbursement_id;  
            this.reimbursement_amount       = reimbursement_amount;  
            this.reimbursement_submitted    = reimbursement_submitted; 
            this.reimbursement_resolved     = reimbursement_resolved ;
            this.reimbursement_description  = reimbursement_description; 
            this.reimbursement_receipt      = reimbursement_receipt ;
            this.reimbursement_author       = reimbursement_author ;
            this.reimbursement_resolver     = reimbursement_resolver; 
            this.reimbursement_status_id    = reimbursement_status_id; 
            this.reimbursement_type_id      = reimbursement_type_id ;
        }

    static from(obj:reimbursementTable){
        const reimbursement = new Reimbursement(         
            obj.ers_reimbursement_id,
            obj.reimbursement_amount,
            obj.reimbursement_submitted,
            obj.reimbursement_resolved,
            obj.reimbursement_description,
            obj.reimbursement_receipt,
            obj.reimbursement_author,
            obj.reimbursement_resolver,
            obj.reimbursement_status_id,
            obj.reimbursement_type_id
            );
        }

}

export interface reimbursementTable {
    ers_reimbursement_id?:       number; 
    reimbursement_amount:       number; 
    reimbursement_submitted:    Date;  
    reimbursement_resolved :    Date;
    reimbursement_description:  string;
    reimbursement_receipt:      string; 
    reimbursement_author :      number; 
    reimbursement_resolver:     string; 
    reimbursement_status_id:    number; 
    reimbursement_type_id :     number; 
}

