import React, {FC} from 'react';
//Material ui
import { Paper, Grid} from '@mui/material';
import SensorForm from './SensorForm';
import Logger from './Logger';
import Selectors from './Selectors';

const styles = {
    root: {
        flexGrow: 1
        },
    paper: {
        padding: 20,
        textAlign: "center",
        color: "blue",
        fontFamily: "Roboto"
    },
    sensorForm: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: '#031329',
    },
    utility: {
        height: '900px',
        padding: '10px 15px',
        textAlign: 'justify',
        color: 'inherit',
        whiteSpace: 'nowrap',
        marginBottom: '15px',
        backgroundColor: '#FDF8F5',
    },
    form: {
        height: '900px',
        width: '95%',
        padding: '10px 15px',
        textAlign: 'justify',
        color: '#FDF8F5',
        whiteSpace: 'nowrap',
        marginBottom: '15px',
        backgroundColor: '#FDF8F5',
    },
    logger: {
        height: '500px',
        width: '99%',
        padding: '10px 10px 10px 10px',
        textAlign: 'justify',
        flexGrow: 1,
        color: '#FDF8F5',
        whiteSpace: 'nowrap',
        marginBottom: '15px',
        backgroundColor: '#FDF8F5',
    },
    divider: {
        margin: '15px',
    },
};


const Dashboard: FC = () => {
    return (
        <Grid container sx={styles.sensorForm} direction='column' alignItems='flex-start' spacing={2}>
            <Grid item xs={12} container direction='row' spacing={2}>
                <Grid item xs={9}>
                    <Paper sx={styles.utility}>
                        <Selectors />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={styles.form}>
                        <SensorForm />
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ width: '100%' }}>
                <Paper sx={styles.logger}>
                    <Logger />
                </Paper>
            </Grid>
        </Grid>

    );
}

export default Dashboard;

