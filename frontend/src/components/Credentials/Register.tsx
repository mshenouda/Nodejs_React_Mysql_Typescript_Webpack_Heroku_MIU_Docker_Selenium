//React libraries
import React, {useState, useContext,  FormEvent, ChangeEvent, FC} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'; 

import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Grid, Box, Typography,
  Container, Snackbar} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from './Copyright';
import ForgetPassword from './Forget';
//import Cookies from 'js-cookie'; 

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
  },
};

const Register: FC<{}> = () => {

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      //credentials: 'include',
      headers: {
        //"X-CSRFToken": Cookies.get('csrftoken'),
        //"Access-Control-Allow-Origin":"*",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({"password":password, "email": email}),  
    })
    .then(res => {
       if(res.status == 201 || res.status == 200) {
        setMessage("Successfully created user");
        setTimeout(() => {
          navigate('/');  
        }, 1000);
      }}) 
    .catch(err => console.log(err));
  } 


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="email" variant="outlined" required fullWidth label="Email Address" onChange={handleEmail} value={email} autoFocus/>
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" variant="outlined" required fullWidth label="Password" type="password" onChange={handlePassword} value={password}/>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>Register</Button>
          <Grid container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
              <NavLink to='/'>Already have an account? Login</NavLink>
            </Grid>
            <Grid item xs={6}> 
              <NavLink to='/forget'>Forget Password</NavLink>
            </Grid>
            <h1>{message}</h1>
          </Grid>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;

//<Snackbar anchorOrigin={{ vertical, horizontal }} open={true} onClose={handleClose} message="Successfully, registered" key={vertical + horizontal} />
//<Snackbar anchorOrigin={{vertical, horizontal}} open={true} onClose={handleClose} message="Successfully, registered" key={vertical + horizontal} />

