//React libraries
import React, {useState, useContext, FormEvent, ChangeEvent, FC} from 'react';
// import { useHistory } from "react-router-dom";
//Material ui libraries
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, 
  Checkbox, Grid, Box, Typography, Container}
  from '@mui/material';

import Copyright from './Copyright';
//import Cookies from 'js-cookie'; 

//Styling
const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    //backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
  },
};


const Logout: FC<{}> = () => {
  
  //const history = useHistory();
  const handleLogout =(e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('Logging out now');
    fetch("http://localhost:8080/api/logout/", {
      method: "POST",
      //history.push("/");
      // headers: {"X-CSRFToken": Cookies.get('csrftoken')},
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
        <Typography component="h1" variant="h5">Logout</Typography>
        <Typography component="p" variant="h6">Thank you for spending some time with us</Typography>
        {/* <Box mt={8}><Link href="/" onClick={handleLogout} variant="body2">Login again</Link></Box>   */}
      </div>
      <Box mt={8}><Copyright /></Box>
    </Container>
  );
}

export default Logout;