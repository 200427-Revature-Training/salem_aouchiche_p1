import React,{useEffect,useState, Component} from 'react';
//import { RouteComponentProps } from 'react-router';
import EmployeeComponent from './employee'; 
import ManagerComponent from './manager'; 
import {useParams} from 'react-router-dom';
import axios from 'axios'; 
import PropTypes from 'prop-types'
import { read } from 'fs';

const View:React.FC= () => {

  EmployeeComponent.propTypes={

      //obj:PropTypes.object.isRequired, 
      click:PropTypes.func.isRequired
    

 }

  let param:any = useParams();
  let role= param.Role;
  let id = param.id; 
  
  console.log("param" +JSON.stringify( param));
  console.log("role" + id); 


  /** send data to backend: */

  //const [reimbType, setReimType] = useState(0);

  
  const sendDataToBackEnd:any= (childData:any)=>{
    const type=childData[0];
    const file=childData[1];
    const amount=childData[2];
    const description=childData[3];

    let reimbType= 0; 
    if (type=='LODGING'){
      reimbType=1
    }
    if (type=='TRAVEL'){
      reimbType=2
    }
    if (type=='FOOD'){
      reimbType=3
    }
    if (type=='OTHER'){
      reimbType=4
    }
   


        
     let formData:any = new FormData();
        formData.append("reimbursement_amount", amount);
        formData.append("reimbursement_submitted", new Date().toISOString());
        formData.append("reimbursement_description", description);
        formData.append("reimbursement_receipt", file);
        formData.append("reimbursement_author", id);
        formData.append("reimbursement_status_id", 2); // pending by default. 
        formData.append("reimbursement_type_id", reimbType);

      console.log("formData ", formData); 
      
      axios.post(`http://localhost:3000/reimbursement`, formData).then((response)=>{

          console.log("response data ", response.data);
          //setPosts(response.data)
          if (response && response.data && response.data.author) {
            getAllEmployeelReimbursementById(id);
          }
      })      
}
      
  /**  get all employees reimbursement  */
  const getAllEmployeelReimbursement =()=> {
    axios.get(`http://localhost:3000/reimbursement`).then((response)=>{

      console.log("response data from get ALL  ", response.data); 
      const data=response.data
      setPosts(data); 
      console.log(data); 
       
  })
}  

/**  get all employees reimbursement by id:  */
  const getAllEmployeelReimbursementById =(id: any)=> {
      axios.get(`http://localhost:3000/reimbursement/+${id}`).then((response)=>{

        console.log("response data ", response.data); 
        const data=response.data
        setPosts(data)
        console.log(data)
    })
  }

  
  useEffect(() => {
    if(role == "Manager"){
      // make a call to back end get all employees and thier information along with 
      // the request they made
        getAllEmployeelReimbursement();     
    }

    if(role=="Employee"){
      // make a call to back end get all employee by id and thier information along with 
      // the request they made
      getAllEmployeelReimbursementById(id);
    } 
  },[]); 



  const Approve= (reimbursement_id:any) => {
        //console.log("id Approved", reimbuesement_id);
        let newData = [...posts]; 
        const updatedReimbursement={
          "reimbursement_resolved": new Date().toISOString(), //now
          "reimbursement_resolver": id, // 25:
          "reimbursement_status_id": 1, // Approved
          "ers_reimbursement_id": reimbursement_id
          }
        
      //   console.log("updatedReimbursement",updatedReimbursement); 
      axios.patch(`http://localhost:3000/reimbursement/update`,updatedReimbursement).then((response)=>{

        //console.log("response data ", response.data); 
        const data=response.data
        //console.log("data from view ", data); 
        
        if (response && response.data && response.data.ers_reimbursement_id) {
          getAllEmployeelReimbursement(); 
        }
    })

  }
   
  const deny= (reimbursement_id:any)=>{
    
     //console.log("id denied", reimbuesement_id);
     let newData = [...posts];
     //console.log("newData", newData); 
      
     const updatedReimbursement={
      "reimbursement_resolved": new Date().toISOString(), //now
      "reimbursement_resolver": id, // 25:
      "reimbursement_status_id": 3, // Denied
      "ers_reimbursement_id": reimbursement_id
      }
        
      //   console.log("updatedReimbursement",updatedReimbursement); 
      axios.patch(`http://localhost:3000/reimbursement/update`,updatedReimbursement).then((response)=>{

        console.log("response data ", response.data); 
        const data=response.data
        console.log("data from view ", data); 
        
        if (response && response.data && response.data.ers_reimbursement_id) {
          getAllEmployeelReimbursement(); 
        }
      })
  }

  // the data u get from the use effect pass it as an arguement to [posts, setPosts] = useState(data);
  const [posts, setPosts] = useState<any>([]);
  
  const [type, setType] =useState("");   
  let userComponent=null
  
    if(role==="Manager"){
      userComponent=(

        <ManagerComponent  denied={deny} approved={Approve}  obj={posts}/> )
    }
    if(role==="Employee"){
      userComponent=(

        <EmployeeComponent  obj={posts} click= {sendDataToBackEnd}/> )
    }
  
  return (
   
    <div>
     {userComponent}  
    </div>
  )

}

export default View;
