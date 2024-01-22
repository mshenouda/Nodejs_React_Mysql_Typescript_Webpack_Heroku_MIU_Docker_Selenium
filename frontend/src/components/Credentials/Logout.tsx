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
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px #000',
    boxShadow: 24,
    p: 4,
  },
  grid: {
    textAlign: 'left',
    fontSize: 15,
  }
};

const Logout: FC<{}> = () => {
  
  const navigate = useNavigate();
  return (
    <Container sx={styles.paper} component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">Logout</Typography>
        <Typography component="p" variant="h6">Thank you for spending some time with us</Typography>
        <Box sx={styles.grid} mt={8}>
          <NavLink to="/">Login again</NavLink>
        </Box>  
      </div>
      <Box mt={8}><Copyright /></Box>
    </Container>
  );
}

export default Logout;