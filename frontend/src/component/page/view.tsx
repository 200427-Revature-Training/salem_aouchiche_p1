import React,{useEffect,useState, Component} from 'react';
//import { RouteComponentProps } from 'react-router';
import EmployeeComponent from './employee'; 
import ManagerComponent from './manager'; 
import * as H from 'history';
import {useParams} from 'react-router-dom';


const View:React.FC= () => {
  let param:any = useParams();
  let role= param.Role;
  let id = param.id; 
  
  console.log("param" +JSON.stringify( param));
  console.log("role" + id); 
  const obj= {
    car :"string1"
    
  }
  
  // get id and Role passed from Log-in component using let role= param.Role
  // let id = param.id
  
  /*
  useEffect(() => {
    if(role == "Manager"){
      // make a call to back end get all employees and thier information along with 
      // the request they made
    }
      
  },[]);
  useEffect(() => {
  if(role=="Employee"){
    // make a call to back end get all employee by id and thier information along with 
    // the request they made
  }
  
    
},[]);
*/
     
     console.log("role"+role);
      const data=[
        {
          ers_username:"salemUsername", 
          ers_password:"salemPaa", 
          user_first_name:"Sally", 
          user_last_name:"Aou", 
          user_email:"sa@gamil.com",
          user_role:"Employee"
        },
        {
          ers_username:"salemAou", 
          ers_password:"salempass", 
          user_first_name:"Salem", 
          user_last_name:"Aouchiche", 
          user_email:"sa@gmail.com",
          user_role:"Employee"
        }

      ]; 
  // the data u get from the use effect pass it as an arguement to [posts, setPosts] = useState(data);
  const [posts, setPosts] = useState(data);

  console.log("posts from View"+posts);
  console.log("data from View"+data);
  const [type, setType] =useState("");   
    let userRole=null
  
    if(role==="Manager"){
      userRole=(

        <ManagerComponent  obj={posts}/> )
    }
    if(role==="Employee"){
      userRole=(

        <EmployeeComponent  obj={posts}/> )
    }
  
  return (
   
    <div>
     {userRole}
     
    </div>
  )

}

export default View;
