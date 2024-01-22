import {styled } from '@mui/system';
import {Button } from '@mui/material';

const CssOutlineButton = styled(Button)({
    backgroundColor: 'primary',
    color: 'primary',
    borderRadius: 6,
    fontSize: 20,
    height: 50,
    margin: '0px 10px 10px 0px',
    '&:hover': {
      backgroundColor: 'primary',
      color: 'white',
    },
    '&.MuiButton-outlinedSuccess': {
        color: 'success',
    }
});

export default CssOutlineButton;