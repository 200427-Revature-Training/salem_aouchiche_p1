import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const classes = useStyles();
  return (
    <div >
      
       <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         <Typography variant="h6" className={classes.title}>
          Expense Reimbursement
          </Typography>
          <Button color="secondary" ><Link to ="/" className="classLink">Sign In</Link></Button>
          <Button color="secondary" ><Link to ="/SignUp" className="classLink">Sign Up</Link></Button>
        </Toolbar>
        
      </AppBar>
    </div>
    </div>
  );
}

export default Nav;