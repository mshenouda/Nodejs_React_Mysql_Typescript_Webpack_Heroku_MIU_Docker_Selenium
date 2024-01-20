//React libraries
import React, {useState, useContext,  FormEvent, ChangeEvent, FC} from 'react';
import {NavLink} from 'react-router-dom'; 

import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Grid, Box, Typography,
  Container, Snackbar} from '@mui/material';

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

  const [fields, setFields] = useState({});
  //let history = useHistory();
  //const {username, email, password} = fields;
  const [message, setMessage] = useState({open: false, vertical: 'top', horizontal: 'center'});
  const { vertical, horizontal, open } = message;

  const handleClose = () => setMessage({ ...message, open: false });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setFields({...fields, [e.target.name]: e.target.value})} 
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    //history.push("/");
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        //"X-CSRFToken": Cookies.get('csrftoken'),
        //"Access-Control-Allow-Origin":"*",
        "Content-type": 'application/json; charset=UTF-8',
      },
      // body: JSON.stringify({"username": username, "password":password, "email": email})  
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  } 


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={styles.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <TextField name="username" variant="outlined" required fullWidth label="Username" onChange={handleChange} value={fields[name]} autoFocus/> */}
              <TextField name="username" variant="outlined" required fullWidth label="Username" onChange={handleChange} autoFocus/>
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" variant="outlined" required fullWidth label="Email Address" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" variant="outlined" required fullWidth label="Password" type="password" onChange={handleChange} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>Register</Button>
          <Grid container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={8}>
              <NavLink to='/'>Already have an account? Login</NavLink>
            </Grid>
            <Grid item xs={4}> 
              <NavLink to='/forget'>Forget Password</NavLink>
            </Grid>
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

