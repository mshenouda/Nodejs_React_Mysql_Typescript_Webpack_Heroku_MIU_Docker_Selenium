//React libraries
import React from 'react';
import { useState, useEffect, FormEvent, ChangeEvent, useContext } from 'react';
import {styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
//Material ui
import { TextField, Stack, Button } from '@mui/material';
import { SensorFormContext } from "./../../contexts/SensorFormContext";
// import getCurrentLine from 'get-current-line';
// import { loggerPost, URL } from './constants.js';


//STYLING
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
  
const styles = {
    sensorForm: {
        borderBlockColor: 'black',
        border: 10,
        borderColor: 'black',
    },
    valid: {
        borderColor: 'green',
        borderWidth: 2,
    },
};


const SensorForm: React.FC<{}> = () => {
    const [errorBox, setErrorBox] = useState<boolean>(false);
    const [errorSensor, setErrorSensor] = useState<boolean>(false);
    const [box, setBox] = useState<string>("");
    const [sensor, setSensor] = useState<string>("");
    const { sensorFormOnOff, setSensorFormOnOff } = useContext(SensorFormContext);


    //Handlers
    const handleBox = (e: ChangeEvent<HTMLInputElement>): void => setBox(e.target.value);
    const handleSensor = (e: ChangeEvent<HTMLInputElement>): void => setSensor(e.target.value);
    const validateBox = (): boolean => {
        return (box === "" || !(/^M[0-9]{5}$/.test(box)))
    }
    const validateSensor = (): boolean => {
        return (sensor === "" || !(/^S[0-9]{5}$/.test(sensor)));
    }

    const handleClick = (): void => {
        if (validateBox())
            setErrorBox(true);
        if (validateSensor())
            setErrorSensor(true);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // loggerPost('Info', getFileDetails(), `Serials: ${record.container} ${record.sensor}`);
        if (errorBox || errorSensor) {
            console.log(errorBox, errorSensor);
            setErrorBox(true);
            setErrorSensor(true);
        }
        else {
            console.log('No errors');
            setSensorFormOnOff(true);
        }
        setErrorBox(false);
        setErrorSensor(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <CssTextField type="text"
                variant='outlined'
                label="Box Serial"
                onChange={handleBox}
                helperText='Box serials: M[0-9]{5}'
                error={errorBox}
                value={box}
                fullWidth
                required /> <br />
            <CssTextField
                type="text"
                variant='outlined'
                label="Sensor Serial"
                helperText='Sensor serials: S[0-9]{5}'
                onChange={handleSensor}
                error={errorSensor}
                value={sensor}
                fullWidth
                required
            /> <br />
            <CssOutlineButton variant="outlined" fullWidth type='submit' disabled={sensorFormOnOff} onClick={handleClick} >Submit</CssOutlineButton>
        </form >
    );
}
export default SensorForm;

