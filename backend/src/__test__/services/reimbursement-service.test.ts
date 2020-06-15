
import * as reimbursementdao from '../../daos/reimbursement-daos';  
import {Reimbursement} from '../../models/Reimbursement';
import * as reimbursementService from '../../services/reimbursement-service'; 


jest.mock('../../daos/reimbursement-daos'); 
const mockReimbursementdao = reimbursementdao as any;



describe('Reimbursement', () => {
    test('it should get all Reimbursements', async ()=> {
        mockReimbursementdao.getAllReimbursements.mockImplementation(()=>{
            return  [
                {
                    "ers_reimbursement_id": 39,
                    "reimbursement_amount": 1000,
                    "author_firstname": "salemEmployee",
                    "author_lastname": "AouchicheEmployee",
                    "reimbursement_description": "nimporte a quoi!",
                    "reimbursement_receipt": "/public/ERDiagram projectP1.JPG",
                    "resolver_firstname": "salemManager",
                    "resolver_lastname": "AouchicheManager",
                    "reimbursement_submitted": "2020-06-10T07:00:00.000Z",
                    "reimb_status": "Approved",
                    "reimb_type": "TRAVEL"
                },
                {
                    "ers_reimbursement_id": 40,
                    "reimbursement_amount": 100,
                    "author_firstname": "salemEmployee",
                    "author_lastname": "AouchicheEmployee",
                    "reimbursement_description": "Food description",
                    "reimbursement_receipt": "/public/receipt1.txt",
                    "resolver_firstname": "salemManager",
                    "resolver_lastname": "AouchicheManager",
                    "reimbursement_submitted": "2020-06-15T13:24:24.146Z",
                    "reimb_status": "Denied",
                    "reimb_type": "FOOD"
                }
            ]

        }); 
         const response = await reimbursementService.getAllReimbursements(); 
        expect(response.length).toEqual(2);
        expect(response[0].reimbursement_amount).toEqual(1000);
        expect(response).toBeDefined();

    });  

    test('it should get reimbursement by id', async () => {

        // Stubbing - Replacing a method with a fake method implementation
        mockReimbursementdao.getReimbursementById.mockImplementation(()=>{
            return {
                "ers_reimbursement_id": 39,
                "reimbursement_amount": 1000,
                "author_firstname": "salemEmployee",
                "author_lastname": "AouchicheEmployee",
                "reimbursement_description": "nimporte a quoi!",
                "reimbursement_receipt": "/public/ERDiagram projectP1.JPG",
                "resolver_firstname": "salemManager",
                "resolver_lastname": "AouchicheManager",
                "reimbursement_submitted": "2020-06-10T07:00:00.000Z",
                "reimb_status": "Approved",
                "reimb_type": "TRAVEL"
            }

        });
        const response = await reimbursementService.getReimbursementById(1);
        expect(response).toBeDefined();
       
        expect(response.ers_reimbursement_id).toEqual(39);

    }); 
    
    test('it should save Reimbursement', async () => {
        // Stubbing - Replacing a method with a fake method implementation
        mockReimbursementdao.saveReimbursement.mockImplementation(() => {
            return {
                ers_reimbursement_id: 39,
                reimbursement_amount: 1000,
                author_firstname: "salemEmployee"
            }
       });
        const newReimb = new Reimbursement(
            
                 39,
                1000,
                new Date,
                new Date,
                "nimporte a quoi!",
                "/public/ERDiagram projectP1.JPG",
                1,
                "salemManager",
                1, 
                2,
            
        )

        const response = await reimbursementService.saveReimbursement(newReimb)
        expect(response.reimbursement_amount).toBeDefined();
        expect(response.ers_reimbursement_id).toEqual(39);
        
    }); 

    test('it should throw 422 error', async () => {
    
        const newReimb = new Reimbursement(
                    
                 39,
                 1000,
                 new Date,
                 new Date,
                 "nimporte a quoi!",
                 "", // receipt is not uploaded, this should fail! 
                 1,
                 "salemManager",
                 1, 
                 2,
        )

        try {
            const response = await reimbursementService.saveReimbursement(newReimb);
        } catch(err) {
            expect(err).toBeDefined();
            expect(err).toEqual(422);
        }
    });


    test('it should update Reimbursement', async () => {
        // Stubbing - Replacing a method with a fake method implementation
        mockReimbursementdao.updateReimbursement.mockImplementation(() => {
            return { 
                ers_reimbursement_id: 39,
                reimbursement_amount: 100,
                author_firstname: "salemEmployee"
            }
       });
        const newReimb = new Reimbursement(
            
                 39,
                1000,
                new Date,
                new Date,
                "nimporte a quoi!",
                "/public/ERDiagram projectP1.JPG",
                1,
                "salem",
                1, 
                2,
        )

        const response = await reimbursementService.saveReimbursement(newReimb)
        expect(response.reimbursement_amount).toBeDefined();
        expect(response.reimbursement_amount).toEqual(1000);
        
    }); 

        
})

