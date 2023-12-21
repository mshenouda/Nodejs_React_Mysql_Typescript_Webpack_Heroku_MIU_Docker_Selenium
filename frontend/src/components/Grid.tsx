import React, { useState, useContext, useEffect, createElement } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
//Material ui
import { Paper, Grid, Box } from '@mui/material';
import SensorForm from './SensorForm';
import Logger from './Logger';
import Selectors from './Selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            backgroundColor: '#333333',
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
            width: '100%',
            padding: '10px 15px',
            textAlign: 'justify',
            color: '#FDF8F5',
            whiteSpace: 'nowrap',
            marginBottom: '15px',
            backgroundColor: '#FDF8F5',
        },
        logger: {
            height: '500px',
            padding: '10px 15px',
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
    }
    ));

const MainGrid: React.FC<{}> = () => {
    //Styling overrides
    const classes = useStyles();

    return (
        <Grid container className={classes.sensorForm} direction='column' alignItems='flex-start' spacing={2}>
            <Grid item xs={12} container direction='row' spacing={2}>
                <Grid item xs={9}>
                    <Paper className={classes.utility}>
                        <Selectors />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.form}>
                        <SensorForm />
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ width: '100%' }}>
                <Paper className={classes.logger}>
                    <Logger />
                </Paper>
            </Grid>
        </Grid>

    );
}

export default MainGrid;


// <div className={classes.root}>
//     <Grid sensorForm spacing={2}>
//         {/*They all will have default widths */}
//         <Grid item xs>
//             <Paper className={classes.paper}>xs</Paper>
//         </Grid>
//         <Grid item xs>
//             <Paper className={classes.paper}>xs</Paper>
//         </Grid>
//     </Grid>
//     <Grid sensorForm spacing={2}>
//         <Grid item xs>
//             <Paper className={classes.paper}>xs</Paper>
//         </Grid>
//         <Grid item xs>
//             <Paper className={classes.paper}>xs</Paper>
//         </Grid>
//         {/*However, this component will have 9 units of space */}
//         <Grid item xs={9}>
//             <Paper className={classes.paper}>xs=9</Paper>
//         </Grid>
//     </Grid>
// </div>