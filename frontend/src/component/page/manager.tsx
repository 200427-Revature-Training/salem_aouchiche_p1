
import React, { useEffect,useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useHistory } from "react-router-dom";



const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 700,
  },
});
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);




    interface ManagerComponentProps {
    obj?: {
              author_firstname: string,  
              author_lastname: string, 
              reimb_status: string,
              reimb_type: string, 
              reimbursement_amount: number, 
              reimbursement_description: string, 
              reimbursement_receipt: string, 
              reimbursement_submitted: Date, 
              resolver_firstname: string, 
              resolver_lastname: string 
          }[],
          denied?:Function,
          approved?:Function,
          profileFirstName?:string,
          profileLasttName?:string

    }

  const ManagerComponent:React.FC<ManagerComponentProps>=(props)=> {
      
      //this useEffect watch for any change in the props passed from View component
      const viewData:any=props.obj
      const profileFirstName:any= props.profileFirstName
      const profileLastName:any= props.profileLasttName
     let  denied:any=props.denied
     let approved:any=props.approved
      const classes = useStyles();
      const [Type, setType] = useState();
      let [posts,setPosts]=useState<any>(viewData?viewData:[]); 
      //console.log("viewData : ", viewData); 
      const [File,setFile]= useState()
      const [Request,setRequest]=useState('')
      const childData =[Type,File];
      let history = useHistory();
      // this function watches for change in type forms
    
      
      useEffect(() => { 
        setPosts(viewData); 
        console.log("useEffec" , viewData)
      },[props.obj]); 

      console.log("posts : ", posts);  

      const handleChange = (e:any) => {
        setType(e.target.value);
      };

  let result:any;
  
  const statusHandleChange = (event:any) => {
    setPosts(viewData)
    setRequest(event.target.value)

    let status = event.target.value
    
    
    if(status==="Approved"){
      result = viewData.filter((post: { reimb_status: any; }) => post.reimb_status == status);
     //let result = viewData.filter(viewData.reimb_status
     setPosts(result)
    }
    
    if(status==="Pending"){
       result = viewData.filter((post: { reimb_status: any; }) => post.reimb_status == status);
       setPosts(result)  
     }
     
    if(status==='Denied'){
       result = viewData.filter((post: { reimb_status: any; }) => post.reimb_status == status);
      //console.log(typeof result)
      setPosts(result)

        
      }
      if(status=='All'){
        setPosts(viewData)
      }
     
  };
  
const requestStatus1=[
  'approved',
  'Pending', 
  'Denied',
  "All"
]
 
let select= null; 

  select=(
    
       <FormControl style={{backgroundColor:'white',width:200,marginBottom:20}} >
          <InputLabel id="demo-simple-select-label" ><b>Status</b></InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={Request}
            onChange={statusHandleChange} > {requestStatus1.map((requestStatus) => 
              ( <MenuItem key={requestStatus} value={requestStatus}  >{requestStatus} </MenuItem>))}
      
          </Select>
 
        </FormControl>

  )


  const form=null

  const button2=null
  const role="Manager"; 
  
  return  (
    <React.Fragment>
     
        <TableContainer component={Paper}>
  <h3> WELCOME: <b> {profileFirstName} {profileLastName}</b> </h3>
        <div>{select}</div>
          <Table className={classes.table} aria-label="customized table">
          
            <TableHead> 
              <TableRow>
                <StyledTableCell align="left">number id:</StyledTableCell>
                <StyledTableCell align="left">FirstName:</StyledTableCell>
                <StyledTableCell align="left">LastName:</StyledTableCell>
                <StyledTableCell align="left">Status:</StyledTableCell>
                <StyledTableCell align="left">Type:</StyledTableCell>
                <StyledTableCell align="left"> amount:</StyledTableCell>
                <StyledTableCell align="left">description:</StyledTableCell>
                <StyledTableCell align="left">receipt:</StyledTableCell>
                <StyledTableCell align="left"> Submitted On: </StyledTableCell>
                <StyledTableCell align="left"> Action: </StyledTableCell>
                <StyledTableCell align="left"> Action: </StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                
                </TableRow >
            </TableHead >

            <TableBody  >
                  {posts.map((post:any) => (
                  <StyledTableRow key={post.ers_reimbursement_id} > 
                      <StyledTableCell align="left" >{post.ers_reimbursement_id}</StyledTableCell>
                      <StyledTableCell align="left" >{post.author_firstname}</StyledTableCell>
                      <StyledTableCell align="left" >{post.author_lastname}</StyledTableCell>
                      <StyledTableCell align="left" >{post.reimb_status}</StyledTableCell>
                      <StyledTableCell align="left" >{post.reimb_type}</StyledTableCell>
                      <StyledTableCell align="left" >{post.reimbursement_amount}</StyledTableCell>
                      <StyledTableCell align="left" >{post.reimbursement_description}</StyledTableCell>
                      <StyledTableCell align="left" > <a href="http://localhost:3000${post.reimbursement_receipt}" target="_blank"> linkedImage</a>
                      </StyledTableCell>
                      <StyledTableCell align="left" >{post.reimbursement_submitted}</StyledTableCell>    
                        
                      <StyledTableCell align="left" >
                      
                        <Button type="submit"variant="contained"color="secondary" style = {{  marginRight : 50 }}
                        onClick={()=> denied(post.ers_reimbursement_id)} > Deny </Button>
                      </StyledTableCell>
                  
                      <StyledTableCell align="left" >
                        <Button type="submit"variant="contained" color="primary" style={{  marginRight : 20 }}
                        onClick={()=>approved(post.ers_reimbursement_id)} >Approve</Button>
                      </StyledTableCell>
                                            
                </StyledTableRow> ))}
               

                                
          </TableBody>
          </Table>
          </TableContainer>
          
    </React.Fragment>
  );
}

export default ManagerComponent;
