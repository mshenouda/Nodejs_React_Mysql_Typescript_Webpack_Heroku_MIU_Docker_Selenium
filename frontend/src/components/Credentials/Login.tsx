
import React, {useState, useContext, FC, ChangeEvent, FormEvent} from 'react';
import {NavLink} from 'react-router-dom'; 
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Grid, Box, Typography, Container}
  from '@mui/material';

import Copyright from './Copyright';

//import Cookies from 'js-cookie'; 
import ForgetPassword from './Forget';


//Styling
const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    //margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
  },
};


const Login: FC<{}> = () => {

  const [fields, setFields] = useState({});
  //let {setUsername } = useContext(UtilitiesContext);
  //const {username, password} = fields;
  //const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setFields({...fields, [e.target.name]: e.target.value})} 
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(fields);
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      //credentials: 'include',
      //headers: {"X-CSRFToken": Cookies.get('csrftoken'),},
      headers: {
        //"X-CSRFToken": Cookies.get('csrftoken'),
        "Access-Control-Allow-Origin":"*",
        "Content-type": 'application/json; charset=UTF-8',
      },
      //body: JSON.stringify({"username": username, "password":password}),
    })
    .then(res=>console.log(res)) //setUsername(username);
    .catch(err=>console.log(err));
  } 


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={styles.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">Login</Typography>
        <form  onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="username" variant="outlined" required fullWidth label="Username" onChange={handleChange} autoFocus/>
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" variant="outlined" required fullWidth label="Password" type="password" onChange={handleChange} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>Login</Button>
          <Grid container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={8}>
              <NavLink to='/register'>Don't have an account? Register</NavLink>
            </Grid>
            <Grid item xs={4}>
              <NavLink to='/forget'>Forget Password</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;

