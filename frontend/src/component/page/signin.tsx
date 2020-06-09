import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
 
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn:React.FC=()=> {
   
  const classes = useStyles();
  let history = useHistory();
  /** initial default values */
  const formDefaultValue={   

    Email:"",
    Password:"",
    Role:"",
    EmailError:"",
    PasswordsError:""
}
  /** use states */

  const [formValues, setFormValues]=useState(formDefaultValue); 
  const {Email,Password,EmailError,PasswordsError,Role}=formValues
  /** update states*/
  const changeHndler=(e:any)=>{
        const target=e.target; 
        setFormValues(prevState=>({
          ...prevState,
          [target.name]:target.value
        }))
    }

const submitHandler = (e:any)=>{
  e.preventDefault(); 
 // console.log("email" +Email);
let id =22; 
 if(Role){
  history.push(`/View/${Role}/${id}`)
 }
}

    console.log("email "+Email);
    console.log("role "+Role);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            autoFocus
            onChange={changeHndler}
            value={Email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="Password"
            id="Password"
            onChange={changeHndler}
            value={Password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Role"
            label="Role"
            type="Role"
            id="Role"
            onChange={changeHndler}
            value={Role}

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link href="/SignUp"> Link </Link>
          
        </form>
      </div>
      
    </Container>
  );
}

export default SignIn; 