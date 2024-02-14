//React libraries
import React, {useState, useContext,  FormEvent, ChangeEvent, FC} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'; 
import CssTextField from './../Common/CssTextField';
import CssOutlinedButton from './../Common/CssOutlinedButton';

import {
  Avatar, CssBaseline, FormControlLabel,
  Checkbox, Grid, Box, Typography,
  Container, Snackbar} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from './Copyright';
import ForgetPassword from './Forget';

const styles = {
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px #000',
    boxShadow: 24,
    p: 4,
  },
  avatar: {
  },
  grid: {
    textAlign: 'left',
    fontSize: 15,
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
    fetch(`http://${process.env.HOST}:${process.env.SERVER_PORT}/api/users/register`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin":"*",
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
    <Container sx={styles.paper} component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField name="email" variant="outlined" required fullWidth label="Email Address" onChange={handleEmail} value={email} autoFocus/>
            </Grid>
            <Grid item xs={12}>
              <CssTextField name="password" variant="outlined" required fullWidth label="Password" type="password" onChange={handlePassword} value={password}/>
            </Grid>
          </Grid>
          <CssOutlinedButton type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>Register</CssOutlinedButton>
          <Grid sx={styles.grid} container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={8}>
              <NavLink to='/'>Already have an account? Login</NavLink>
            </Grid>
            <Grid item xs={4}> 
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

