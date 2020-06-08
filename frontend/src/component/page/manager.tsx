
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
//import '../App.css';


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

interface ManagerComponentProps {
  obj?:{ ers_username:string, 
    ers_password:string, 
    user_first_name:string, 
    user_last_name:string, 
    user_email:string,
    user_role:string}[]
//pass:string

}

const ManagerComponent:React.FC<ManagerComponentProps>=(props)=> {
//  this useEffect watch for any change in the props passed from View component
   
  const posts=props.obj; 
  //const  role=props.pass

  const classes = useStyles();
  const [Type, setType] = useState();
  const [posts1,setPsts1]=useState(posts ? posts:[])
  const [File,setFile]= useState()
  const [Request,setRequest]=useState('Pending')
  const childData =[Type,File]
  // this function watches for change in type forms
 
  const handleChange = (e:any) => {
    setType(e.target.value);
  };

// this function watches for change in files forms
  const handleChange1 = (e:any) => {
   setFile(e.target.files[0]);
   
  };
  
const requestStatus1=[
  'Approved',
  'Denied',
  "All"
]

  const form=null
  const select=null
  const button2=null
  const role="Manager"; 
  
  return  (
    <React.Fragment>
     
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>First-Name</StyledTableCell>
            <StyledTableCell align="right" >ELast-Name</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right" >Type</StyledTableCell>
            <StyledTableCell align="right" > Submitted On: </StyledTableCell>
            <StyledTableCell align="right" > Resolved On: </StyledTableCell>
            <StyledTableCell align="right" > Status: </StyledTableCell>
            
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
              <StyledTableCell align="right" >{post.user_role}</StyledTableCell>
              <StyledTableCell align="right" >
                <Button type="submit"variant="contained"color="secondary" style = {{  marginRight : 50 }}>Deny</Button>
              </StyledTableCell>
              <StyledTableCell align="right" >
                <Button type="submit"variant="contained" color="secondary" style={{  marginRight : 20 }}>Approve</Button>
              </StyledTableCell>
              

            </StyledTableRow> ))}
            
       </TableBody>
      </Table>
      </TableContainer>
   
     </React.Fragment>
  );
}

export default ManagerComponent;
