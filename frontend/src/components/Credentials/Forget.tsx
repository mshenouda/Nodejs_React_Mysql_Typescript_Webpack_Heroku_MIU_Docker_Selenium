//React libraries
import React, {useState, useContext, FC} from 'react';
import { Link } from "react-router-dom";
import { Avatar, Button, CssBaseline,
        TextField, FormControlLabel, Checkbox,
        Grid, Box, Typography, Container
      } from '@mui/material';

import Copyright from './Copyright';

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

const ForgetPassword: React.FC<{}> = () => {
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={styles.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">Forget Password</Typography>
        <form>
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>Submit</Button>
          <Grid container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={9}>
              {/* <Link to="/register" href="/register" variant="body2">Don't have an account? Register</Link> */}
            </Grid>
            <Grid item xs={3}>
              {/* <Link to="/" href="/" variant="body2">Login</Link> */}
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