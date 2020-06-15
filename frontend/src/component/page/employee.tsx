

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
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import PropTypes from 'prop-types'
import { prototype } from 'enzyme-adapter-react-16';
 
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
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


interface EmployeeComponentProps{
    obj?: {
      author                  :string, 
      reimb_status            :string, 
      reimb_type              :string, 
      reimbursement_amount    :number, 
      reimbursement_description:string,
      reimbursement_receipt   :string, 
      reimbursement_resolved  :Date,
      reimbursement_submitted :Date,
      resolver                :string 
    }[], 
    click?:Function
    
          }
    interface clickableInterface {
      click:Function
    }

          
export const EmployeeComponent:React.FC<EmployeeComponentProps> = (props)=>{ 

          const viewData=props.obj; 
          const classes = useStyles();
          const [Type, setType] = useState();
          const [posts,setPosts]=useState<any>(viewData ? viewData :[])
          const [File,setFile]= useState();
          const [amount,setAmount]= useState(); 
          const [description,setDescription]= useState();
          const sendDataToView =[Type,File,amount,description]; 
          const click:any= props.click
console.log(viewData)
             
      useEffect(() => { 
        setPosts(viewData); 
      },[props.obj]);
          
          const names=
            [
              'LODGING', 
              'TRAVEL', 
              'FOOD', 
              'OTHER'
            ]
      

      const typeHandleChange=(event:any)=>{
        setType(event.target.value);

      }

      const fileHandleChange=(event:any)=>{
        setFile(event.target.files[0]);
      }

      const amountHandleChange =(event:any)=>{
        setAmount(event.target.value);  

      }
      const descriptionHandleChange =(event:any)=>{
        setDescription(event.target.value); 
        
      }

      

  return (
          
    <React.Fragment>
      
        <TableContainer component={Paper}>
        <h3> WELCOME BACK:  <b>{posts.map((post:any) => post.author)[0]} </b> </h3>

            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                  <TableRow>
                  
                    <StyledTableCell align="left" >reimbursement_submitted:</StyledTableCell>
                    <StyledTableCell align="left" >reimbursement_resolved:</StyledTableCell>
                    <StyledTableCell align="left">reimbursement_description:</StyledTableCell>
                    <StyledTableCell align="left" >reimbursement_receipt:</StyledTableCell>
                    <StyledTableCell align="left" >resolver: </StyledTableCell>
                    <StyledTableCell align="left" >reimbursement_amount $:</StyledTableCell>
                    <StyledTableCell align="left" >reimb_status: </StyledTableCell>
                    <StyledTableCell align="left" >reimb_type: </StyledTableCell>
                    <StyledTableCell align="left" ></StyledTableCell>

                  </TableRow >
              </TableHead >

              <TableBody  >
                {posts.map((post:any) => (
                  <StyledTableRow key={post.ers_reimbursement_id} >


                      <StyledTableCell align="left" > {post.reimbursement_submitted}  </StyledTableCell>
                      <StyledTableCell align="left" >  {post.reimbursement_resolved}  </StyledTableCell>
                      <StyledTableCell align="left" >  {post.reimbursement_description}  </StyledTableCell>
                      <StyledTableCell align="left" >  {post.reimbursement_receipt}  </StyledTableCell>
                      <StyledTableCell align="left" >  {post.resolver}  </StyledTableCell>
                      <StyledTableCell align="left" >  {post.reimbursement_amount}  </StyledTableCell>
                      <StyledTableCell align="left" >  {post.reimb_status}  </StyledTableCell>
                      <StyledTableCell align="left" >  {post.reimb_type}  </StyledTableCell>
                      <StyledTableCell align="left" > 
                        
                      </StyledTableCell>
                      
                  </StyledTableRow> ))}
                    
              </TableBody>
            </Table>
           
        </TableContainer>
        <FormControl >
            <InputLabel id="demo-simple-select-label">Types</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={Type} onChange={typeHandleChange} name="Type"  >
              {names.map((name) => (
                <MenuItem key={name} value={name} >{name} </MenuItem>
              ))}
            </Select>
          
            <input onChange={fileHandleChange} id="upload-File" name="upload-File" type="file" style={{  marginTop : 20 }} />

            <label>Amount $: 
    
            <input onChange={amountHandleChange} id="amount" name="amount" value={amount} type="text" style={{  marginTop : 20, width:400,height:20 } }/>
            </label>
            <label> Description: 
            <input onChange={descriptionHandleChange} id="description" name="description" value={description} type="text" style={{  marginTop : 20,width:400,height:60 }} />
            </label>
             <Button type="submit" variant="contained" color="secondary"style={{  marginTop : 20, marginLeft: 80, width: 400}} onClick={() => click(sendDataToView)} > add reimbursement </Button> 
            
            
          
      </FormControl>
        
       
    </React.Fragment>
  );

}
export default EmployeeComponent;
