//React libraries
import React, {useState, useContext, FormEvent, ChangeEvent, FC} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'; 
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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
  },
};

const Logout: FC<{}> = () => {
  
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">Logout</Typography>
        <Typography component="p" variant="h6">Thank you for spending some time with us</Typography>
        <Box mt={8}>
          <NavLink to="/">Login again</NavLink>
        </Box>  
      </div>
      <Box mt={8}><Copyright /></Box>
    </Container>
  );
}

export default Logout;