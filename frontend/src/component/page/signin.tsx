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
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

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
    user_email:"",
    ers_password:"",
    Role:"",
    user_email_error:"",
    ers_password_error:""
}
  /** use states */
  const [formValues, setFormValues]=useState(formDefaultValue); 
  const {user_email,ers_password,user_email_error,ers_password_error,Role}=formValues
  /** update states*/
  const changeHndler=(e:any)=>{
        const target=e.target; 
        setFormValues(prevState=>({
          ...prevState,
          [target.name]:target.value
        }))
    }
    /** Validation */    
    const validate=()=>{
      let ers_password_error ="";
      let user_email_error=""; 
      /** Check Password */
      if(!(ers_password.length>8)){
        ers_password_error="Password is short !";
      }
     
      /** Check email */
      if(!user_email.includes("@")){
         user_email_error="user_email is invalid !";
      }
     
      if( ers_password_error ||user_email_error){
           setFormValues((prevState: any)=>({
               ...prevState,

               ers_password_error:ers_password_error,   
               user_email_error:user_email_error,
               
             }))
           return false
       }
       return true
   }


const submitHandler = (e:any)=>{
    e.preventDefault(); 

    const isValidate= validate()
             if(isValidate){
                axios.post(`http://localhost:3000/users/user/${user_email}`,formValues)
                .then((response)=>{
                  console.log(response.data); 
                  const id = response.data.userId; 
                  const role=response.data.user_role; 
                  const token=response.data.token;  
                  
                  if(token){
                    history.push(`/View/${role}/${id}`); 
                  }
                })

             }else{
              //console.log("error occurred!");
              setFormValues(prevState=>({
                ...prevState,               
                EmailError:"Email Address or Password are incorrect",               
                }))
        
             }
    console.log("formValues", formValues); 
    
}

    console.log("user_email "+user_email);
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
            id="user_email"
            label="user_email"
            name="user_email"
            autoComplete="user_email"
            autoFocus
            onChange={changeHndler}
            value={user_email}
          />
          <div style={{fontSize:12,color:"red"}} >{user_email_error}</div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ers_password"
            label="ers_password"
            type="ers_password"
            id="ers_password"
            onChange={changeHndler}
            value={ers_password}
          />
          <div style={{fontSize:12,color:"red"}} >{ers_password_error}</div>
          
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
          <Link href="/SignUp"> Link to signUp </Link>
          
        </form>
      </div>
      
    </Container>
  );
}

export default SignIn; 