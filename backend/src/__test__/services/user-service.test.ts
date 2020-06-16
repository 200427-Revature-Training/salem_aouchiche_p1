
import * as userdao from '../../daos/user-daos';  
import {User} from '../../models/User';
import * as userService from '../../services/user-service'; 


jest.mock('../../daos/user-daos'); 
const mockUserdao = userdao as any;

describe('User', () => {
    test('it should get all Users', async ()=> {
        mockUserdao.getAllUsers.mockImplementation(()=>{
            return  [
                {
                    "ers_username": "SalemManager3",
                    "user_first_name": "SalemManager3F",
                    "user_last_name": "SalemManager3L",
                    "user_email": "SalemManager3@gmail.com",
                    "user_role": "Manager"
                },
                {
                    "ers_username": "SalemManager",
                    "user_first_name": "salemAsManager",
                    "user_last_name": "Aouchiche",
                    "user_email": "SalemManager@gmail.com",
                    "user_role": "Manager"
                },
                {
                    "ers_username": "salem ",
                    "user_first_name": "Salem",
                    "user_last_name": "Aouchiche",
                    "user_email": "salem.aouchiche@gmail.com",
                    "user_role": "Manager"
                },
                {
                    "ers_username": "SalemEmployee",
                    "user_first_name": "salemAsEmployee",
                    "user_last_name": "Aouchiche",
                    "user_email": "SalemEmployee@gmail.com",
                    "user_role": "Employee"
                }
            ]

        }); 
         const response = await userService.getAllUsers(); 
        expect(response.length).toEqual(4);
        expect(response[3].user_last_name).toEqual("Aouchiche");
        expect(response).toBeDefined();

    });  


    test('it should get users by id', async () => {

        // Stubbing - Replacing a method with a fake method implementation
        mockUserdao.getUserById.mockImplementation(()=>{
            return {
                    "ers_username": "salem ",
                    "user_first_name": "Salem",
                    "user_last_name": "Aouchiche",
                    "user_email": "salem.aouchiche@gmail.com",
                    "user_role": "Manager"
                }
            

        });
        const response = await userService.getUserById(1);
        expect(response).toBeDefined();
        expect(response.user_email).toEqual("salem.aouchiche@gmail.com");

    }); 

    
    test('it should get users by Email', async () => {

        // Stubbing - Replacing a method with a fake method implementation
        mockUserdao.getUserByEmail.mockImplementation(()=>{
            return {
                    "ers_username": "salem ",
                    "user_first_name": "Salem",
                    "user_last_name": "Aouchiche",
                    "user_email": "salem.aouchiche@gmail.com",
                    "user_role": "Manager"
                }
            

        });
        const response = await userService.getUserByEmail("salem.aouchiche@gmail.com");
        expect(response).toBeDefined();
        expect(response.user_first_name).toEqual("Salem");

    }); 

    
    test('it should save User', async () => {
        // Stubbing - Replacing a method with a fake method implementation
        mockUserdao.saveUser.mockImplementation(() => {
            return {
                "ers_username": "salem ",
                "user_first_name": "Salem",
                "user_last_name": "Aouchiche",
                "user_email": "salem.aouchiche@gmail.com",
            }
       });
        const newUser= new User(
            "salem ",
            "pass",
            "Salem",
            "Aouchiche",
            "salem.aouchiche@gmail.com",
            1
        )

        const response = await userService.saveUser(newUser)
        expect(response.user_email).toBeDefined();
        expect(response.user_email).toEqual("salem.aouchiche@gmail.com");
        
    }); 

    test('it should throw 422 error', async () => {
    
        const newUser = new User(
                    
            "salem ",
            "pass",
            "Salem",
            "Aouchiche",
            "salem.aouchiche@gmail.com",
            1
        )

        try {
            const response = await userService.saveUser(newUser);
        } catch(err) {
            expect(err).toBeDefined();
            expect(err).toEqual(422);
        }
    });
        
})
