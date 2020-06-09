import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import axios from 'axios'; 

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp:React.FC= () => {
  let history = useHistory()
  const classes = useStyles();
  const formDefaultValue={
        ers_username:"", 
        ers_password:"",
        user_first_name:"",
        user_last_name:"",
        user_email:"",
        user_role_id:"",
        ers_username_error:"", 
        ers_passwordError:"",
        user_first_nameError:"",
        user_last_nameError:"",
        user_emailError:"",
        user_role_idError:""

  }
  const [formValues, setFormValues]=useState(formDefaultValue)
    let { ers_username, user_last_name,user_first_name,user_email,ers_password,user_emailError,ers_passwordError, user_last_nameError,user_first_nameError, ers_username_error,user_role_id}=formValues
    const changeHndler=(e:any)=>{
        const target=e.target
        setFormValues(prevState=>({
          ...prevState,
          [target.name]:target.value
        }))
        }
        const validate=()=>{
            let ers_username_error=""; 
            let user_emailError="";
            let ers_passwordError ="";
            let  user_last_nameError=""
            let user_first_nameError="";
            let  user_role_idError=""
            if(!ers_username){
              ers_username_error= "Username Requiered ";
         }
            if(! user_last_name){
                 user_last_nameError="Last Name Requiered ";
            }
            if(!user_first_name){
                user_first_nameError="First Name Requiered ";
            }
            if(!ers_password){
             ers_passwordError="Password Requiered ";
         }
         
             if(!user_email.includes("@")){
               user_emailError="user_email is invalid";
             }
             if(!user_role_id){
              user_role_id="user_role_id is Requiered ";
          }
             
             if(ers_username_error || user_emailError || ers_passwordError || user_last_nameError ||user_first_nameError || user_role_idError){
                 setFormValues(prevState=>({
                     ...prevState,
                     ers_username_error, 
                     user_emailError:user_emailError,
                     ers_passwordError:ers_passwordError,
                      user_last_nameError: user_last_nameError,
                     user_first_nameError:user_first_nameError,
                     user_role_idError:user_role_idError
                   }))
                 return false
             }
             return true
         }

        const submitHandler= (e:any)=>{
            e.preventDefault()
            console.log("formValues "+JSON.stringify(formValues)); 
            
            const isValidate= validate()
            
             if(isValidate){
                  axios.post('http://localhost:3000/users/',formValues).then((res)=>{
                    console.log(res)
                    alert("Signed up")
                 console.log("signed up!");
                 history.push("/")
                })
            }else{
              console.log("error occurred!");
              history.push("/SignUp");
            }
           
        
        }

  return (<Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <form className={classes.form} noValidate onSubmit={submitHandler}>
      
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id=" ers_username"
            label="Username"
            name="ers_username"
            value={ers_username}
            autoComplete="ers_username"
            onChange={changeHndler}
          />
           <div style={{fontSize:12,color:"red"}} >{ user_last_nameError}</div>
        </Grid>
        

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="ers_password"
            label="Password"
            type="password"
            id="ers_password"
            value={ers_password}
            autoComplete="current-password"
            onChange={changeHndler}
          />
           <div style={{fontSize:12,color:"red"}} >{ers_passwordError}</div>
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="user_first_name"
            variant="outlined"
            required
            fullWidth
            id="user_first_name"
            label="First Name"
            value={user_first_name}
            autoFocus
            onChange={changeHndler}
          />
           <div style={{fontSize:12,color:"red"}} >{user_first_nameError}</div>
        </Grid>
        
      <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="user_last_name"
            label="Lastname"
            name="user_last_name"
            value={ user_last_name}
            autoComplete="user_last_name"
            onChange={changeHndler}
          />
           <div style={{fontSize:12,color:"red"}} >{ user_last_nameError}</div>
        </Grid>
       
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="user_email"
            label="Email"
            name="user_email"
            autoComplete="user_email"
            value={user_email}
            onChange={changeHndler}
          />
           <div style={{fontSize:12,color:"red"}} >{user_emailError}</div>
        </Grid>
        
        <Grid item xs={12}>
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="user_role_id"
        label="User_role: (1 || 2)"
        type="user_role_id"
        id="user_role_id"
        autoComplete="current-password"
        onChange={changeHndler}
        value={user_role_id}
      />
           <div> 1: as Manager  2: as Employee</div>
           <div style={{fontSize:12,color:"red"}} >{ers_passwordError}</div>
        </Grid>
        
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
      
    </form>
  </div>
</Container>
);
}

export default SignUp; 