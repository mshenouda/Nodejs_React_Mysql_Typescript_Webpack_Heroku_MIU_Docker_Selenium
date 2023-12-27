//React libraries
import React from 'react';
import { useState, useEffect, FormEvent, ChangeEvent, useContext } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
//Material ui
import { TextField, Stack, Button } from '@mui/material';
import { SensorFormContext } from "./../contexts/SensorFormContext";
// import getCurrentLine from 'get-current-line';
// import { loggerPost, URL } from './constants.js';


//STYLING
const useStyles = makeStyles((theme: Theme) => createStyles({
    sensorForm: {
        borderBlockColor: 'black',
        border: 4,
        borderColor: 'black',
    },
    submit: {
        color: 'white',
        backgroundColor: 'green',
        borderRadius: 6,
        fontSize: 20,
        height: 50,
        margin: '0px 10px 0px 0px'
    },
    valid: {
        borderColor: 'green',
        borderWidth: 2,
    },
    textField: {
        margin: '10px 20px 20px 0px',
        '& .MuiInputLabel-root': {
            fontSize: 14,
            fontWeight: 300,
            '&.Mui-focused': {
                fontSize: 20,
                margin: '0px 0px 0px 0px'
            },
            '&.Mui-error': {
                color: 'primary',
                fontFamily: 'sans-serif',
            },
        },
        '& .MuiOutlinedInput-root': {
            "& fieldset": {
                borderColor: 'default',
                borderWidth: 1,
            },
            '&:hover fieldset': {
                borderColor: 'default',
                borderWidth: 2,
            },
            "&.Mui-focused fieldset": {
                borderColor: 'primary',
                borderLeftWidth: 4,
            },
            "&.Mui-error fieldset": {
                borderColor: 'red',
            },
        },
        '& .MuiFormHelperText-root': {
            color: 'primary',
            fontSize: 12,
            '&.Mui-error': {
                color: 'red',
                fontSize: 12,
            }
        },
        '& input:valid fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
    }
}));

const SensorForm: React.FC<{}> = () => {
    //STYLING Overrides
    const classes = useStyles();
    //Context hooks
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
        <form className={classes.sensorForm} onSubmit={handleSubmit}>
            <TextField type="text"
                variant='outlined'
                className={classes.textField}
                label="Box Serial"
                onChange={handleBox}
                helperText='Box serials: M[0-9]{5}'
                value={box}
                fullWidth
                required /> <br />
            <TextField
                type="text"
                variant='outlined'
                className={classes.textField}
                color='secondary'
                label="Sensor Serial"
                helperText='Sensor serials: S[0-9]{5}'
                onChange={handleSensor}
                value={sensor}
                fullWidth
                required
            /> <br />
            <Button variant="outlined" className={classes.submit} fullWidth type="submit" disabled={sensorFormOnOff} onClick={handleClick}>Submit</Button>
        </form >
    );
}
export default SensorForm;

