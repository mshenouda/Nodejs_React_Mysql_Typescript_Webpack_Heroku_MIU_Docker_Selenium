import React, {FC} from 'react';
//Material ui
import { Paper, Grid} from '@mui/material';
import { Theme } from '@mui/material/styles';
import SensorForm from './SensorForm';
import Logger from './Logger';
import Selectors from './Selectors';

// Shared so every panel has identical padding, radius and colour — keeps all
// corners equidistant from the page edges and from each other. Colours come
// from the theme so they adapt to light/dark mode.
const panelBase = (theme: Theme) => ({
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    textAlign: 'justify' as const,
    whiteSpace: 'nowrap' as const,
});

const styles = {
    // Outer page area. The 8px padding equals the per-item padding produced by
    // Grid spacing={2}, so the gap to the edges matches the gap between panels.
    sensorForm: (theme: Theme) => ({
        display: 'flex',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: '8px',
    }),
    utility: (theme: Theme) => ({
        ...panelBase(theme),
        height: '900px',
        width: '100%',
    }),
    form: (theme: Theme) => ({
        ...panelBase(theme),
        height: '900px',
        width: '100%',
    }),
    logger: (theme: Theme) => ({
        ...panelBase(theme),
        height: '500px',
        width: '100%',
        flexGrow: 1,
    }),
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

