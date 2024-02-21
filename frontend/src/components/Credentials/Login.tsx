
import React, {useState, useContext, FC, ChangeEvent, FormEvent} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'; 
import CssTextField from '../Common/CssTextField';
import CssOutlinedButton from '../Common/CssOutlinedButton';
import endPoint from '../Common/EndPoint';
import {
    Avatar, CssBaseline, Grid, Box, Typography, Container
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from './Copyright';
import { UserNameContext } from "../../contexts/UserNameContext";


//Styling
const styles = {
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px #000',
    boxShadow: 12,
    p: 4,
  },
  avatar: {
  },
  grid: {
    textAlign: 'left',
    fontSize: 15,
  },
  error: {
    textAlign: 'left',
    fontSize: 25,
    color: 'red'
  },
  success: {
    textAlign: 'left',
    fontSize: 25,
    color: 'green'
  },
  submit: {
  },
};

type message = {
    value: string,
    error: boolean
};

const Login: FC<{}> = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<message>({value: "", error:false});
  const {userName, setUserName} = useContext(UserNameContext);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetch(`${endPoint}/api/users`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({"password":password, "userName": userName}),  
    })
    .then(res => res.json())
    .then(res => {
      if (res.length == 0) {
        setMessage({value: "Failed Credentials", error:true});
        setTimeout(() => {
          setMessage({value: "", error:false});
        }, 1000);     
      } 
      else {
        setMessage({value:"Successfully logged in", error:false});  
        setTimeout(() => {
          navigate('/main');  
        }, 1000);
      }
    }) 
    .catch(err => console.log(err));
  } 

  return (
    <Container sx={styles.paper} component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField name="userName" variant="outlined" required fullWidth label="UserName" onChange={handleUserName} value={userName} autoFocus/>
            </Grid>
            <Grid item xs={12}>
              <CssTextField name="password" variant="outlined" required fullWidth label="Password" type="password" onChange={handlePassword} value={password}/>
            </Grid>
          </Grid>
          <CssOutlinedButton type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>Login</CssOutlinedButton>
          <Grid sx={styles.grid} container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={8}>
              <NavLink to='/register'>Don't have an account? Register</NavLink>
            </Grid>
            <Grid item xs={4}>
              <NavLink to='/forget'>Forget Password</NavLink>
            </Grid>
          </Grid>
          <Typography sx={{color:(message.error)?styles.error:styles.success}}>{message.value}</Typography>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;

