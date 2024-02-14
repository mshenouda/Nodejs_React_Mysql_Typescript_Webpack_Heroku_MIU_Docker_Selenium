//React libraries
import React, { useState, useEffect, FormEvent, ChangeEvent, useContext, FC } from 'react';
import CssTextField from './../Common/CssTextField';
import CssOutlinedButton from './../Common/CssOutlinedButton';

import { Stack } from '@mui/material';
import { SensorFormContext } from "./../../contexts/SensorFormContext";


//STYLING
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

const SensorForm: FC = () => {
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
            <CssOutlinedButton variant="outlined" fullWidth type='submit' disabled={sensorFormOnOff} onClick={handleClick} >Submit</CssOutlinedButton>
        </form >
    );
}
export default SensorForm;

