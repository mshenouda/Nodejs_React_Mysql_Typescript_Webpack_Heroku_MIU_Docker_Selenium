import {styled } from '@mui/system';
import { TextField } from '@mui/material';

const CssTextField = styled(TextField)(
    {
        margin: '10px 20px 20px 0px',
        //inputLabel
        '& .MuiInputLabel-root': {
            fontSize: 20,
            fontWeight: 300,
            '&.Mui-focused': {
                fontSize: 20,
                margin: '0px 0px 0px 0px'
            },
            '&.Mui-error': {
                color: 'red',
                fontWeight: 'bold',
            },
        },
        //outlinedInput
        '& .MuiOutlinedInput-root': {
            "& fieldset": {
                borderColor: 'primary',
                borderWidth: 2,
            },
            '&:hover fieldset': {
                borderColor: 'primary',
                borderWidth: 3,
            },
            "&.Mui-focused fieldset": {
                borderColor: 'primary',
                borderLeftWidth: 4,
            },
            "&.Mui-error fieldset": {
                borderColor: 'red',
            },
        },
        //helperText
        '& .MuiFormHelperText-root': {
            color: 'primary',
            fontSize: 12,
            '&.Mui-error': {
                color: 'red',
                fontSize: 12,
            }
        },
        //inputValid
        '& input:valid fieldset': {
            borderColor: 'green',
            borderWidth: 4,
        }
});

export default CssTextField;