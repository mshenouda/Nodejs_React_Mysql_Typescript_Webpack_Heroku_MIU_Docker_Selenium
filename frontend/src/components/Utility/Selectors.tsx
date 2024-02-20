//React
import React, { FC, useContext } from "react";
import { SensorFormContext } from "../../contexts/SensorFormContext";
//Material ui
import Grid from "@mui/material/Grid";
import Selector from "./Selector";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow.js';
import canon from './../../static/images/canon.png';
import hitachi from './../../static/images/hitachi.png';
import bluebox from './../../static/images/bluebox.png';
import yellowbox from './../../static/images/yellowbox.png';
import sensor1 from './../../static/images/sensor1.png';
import sensor2 from './../../static/images/sensor2.png';
import ScrollableTabs from "./ScrollableTabs";

const styles = {
    button: {
        height: '40px',
        width: '100px',
        marginTop: '30px',
        marginBottom: '0px',
        marginLeft: '20px',
        marginRight: '20px',
    } 
};    

const Selectors: FC<{}> = () => { 

    type MyRecord = {
        name: string,
        src: string
    };
    const MyCompanies: MyRecord[] = [
        {
            name: 'canon',
            src: canon,
        },
        {
            name: 'hitachi',
            src: hitachi,
        }
    ];

    const MyBoxes: MyRecord[] = [
        {
            name: 'bluebox',
            src: bluebox,
        },
        {
            name: 'yellowbox',
            src: yellowbox,
        }
    ];

    const MySensors: MyRecord[] = [
        {
            name: 'sensor1',
            src: sensor1,
        },
        {
            name: 'sensor2',
            src: sensor2,
        }
    ];

    const { sensorFormOnOff } = useContext(SensorFormContext);
    const handleClick = () => {
        console.log(`sensorFormOnOff: ${sensorFormOnOff}`);
    }

    return (
        <div>
            <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                    <Grid container direction="row" alignItems='flex-start' spacing={1}>
                        <Grid item xs={3}>
                            <Selector label='Company' records={MyCompanies} disabled={!sensorFormOnOff}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Selector label='Box' records={MyBoxes} disabled={!sensorFormOnOff} />
                        </Grid>
                        <Grid item xs={3}>
                            <Selector label="Sensor" records={MySensors} disabled={!sensorFormOnOff}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PlayArrowIcon />} sx={styles.button} disabled={!sensorFormOnOff} size='large' variant='contained' color='primary' onClick={handleClick}>Submit</Button>
                        </Grid>
                    </Grid>
                    <ScrollableTabs disabled={!sensorFormOnOff} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Selectors;




