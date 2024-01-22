//React libraries
import React, {useState, useContext, FC} from 'react';
import { NavLink } from "react-router-dom";
import CssTextField from './../Common/CssTextField';
import CssOutlinedButton from './../Common/CssOutlinedButton';

import { Avatar, CssBaseline,
        FormControlLabel, Checkbox,
        Grid, Box, Typography, Container
      } from '@mui/material';

import Copyright from './Copyright';

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
  avatar: {
  },
  grid: {
    textAlign: 'left',
    fontSize: 15,
  },
  submit: {
  },
};

const ForgetPassword: React.FC<{}> = () => {
  
  return (
    <Container sx={styles.paper} component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={styles.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">Forget Password</Typography>
        <form>
          <CssTextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
          <CssOutlinedButton type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>Submit</CssOutlinedButton>
          <Grid sx={styles.grid} container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={9}>
              <NavLink to='/'>Don't have an account? Register</NavLink>
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

export default ForgetPassword;