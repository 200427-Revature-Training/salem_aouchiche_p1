

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
    obj?:{
        ers_username:string, 
        ers_password:string, 
        user_first_name:string, 
        user_last_name:string, 
        user_email:string,
        user_role:string}[], 
    //pass:string
}

export const EmployeeComponent:React.FC<EmployeeComponentProps> = (props)=>{

 
  console.log("pros.obj "+props.obj);
  console.log("pros "+props); 
  console.log("pros.obj "+props.obj);
  const posts2=props.obj;
  //const role=props.pass

  const classes = useStyles();
  const [Type, setType] = useState();
  const [posts1,setPsts1]=useState(posts2 ? posts2 :[])
  const [File,setFile]= useState()
  const [Request,setRequest]=useState('Pending')
  const childData =[Type,File]
  
  const names=[
    'LODGING', 
    'TRAVEL', 
    'FOOD', 
    'OTHER'
]
  
 console.log("Employee"+ props.obj); 

  return  (
    <React.Fragment>
     
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            
          <StyledTableCell>Sub-Date:</StyledTableCell>
            <StyledTableCell align="right"  >Reso_Date:</StyledTableCell>
            <StyledTableCell align="right">Description:</StyledTableCell>
            <StyledTableCell align="right" >Receipt</StyledTableCell>
            <StyledTableCell align="right" >Resolved By: </StyledTableCell>
            <StyledTableCell align="right" >Amount $:</StyledTableCell>
            <StyledTableCell align="right" >Status: </StyledTableCell>

            </TableRow >
        </TableHead >


        <TableBody  >
        {posts1.map((post) => (
          <StyledTableRow key={post.ers_username}   >
              <StyledTableCell component="th" scope="row" >
              {post.user_first_name}
              </StyledTableCell>
              <StyledTableCell align="right"  >{post.user_last_name}</StyledTableCell>
              <StyledTableCell align="right" >{post.user_email}</StyledTableCell>
              <StyledTableCell align="right" > 
                 <Button type="submit" variant="contained" color="secondary"style={{  marginTop : 20 }} > add </Button> 
              </StyledTableCell>
              
            </StyledTableRow> ))}
            
       </TableBody>

      </Table>
      </TableContainer>
     
     </React.Fragment>
  );

}
export default EmployeeComponent;
