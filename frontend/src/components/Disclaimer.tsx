//React
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import TitlebarImageList from './TitleBarImage';

//Styling
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: '150ch',
        // backgroundColor: theme.palette.grey
    },
    inline: {
        display: 'inline',
    },
}));

interface Props {

};

const Disclaimer: React.FC<Props> = ({ }) => {
    //Styling overrides
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h3">Disclaimer:</Typography>
            <h2>IntegratedSuite is a FULL STACK project meant to provide one full solution for hardware testing, software automation, backend and frontend support.</h2>
            <h4>The custom way of building testing software was to design desktop applications based on QT5 framework. However, that seems hard solution due to long learning curve i.e using QT5, HTML templates, adding CSS styles. Not mentioning, lack of online support for bugs, which slows the development process.</h4>
            <h4>Additionally, hosting reputable customers like Mercedes, BMW demands building reliable solutions that better showcase integratedsuite products.</h4>
            <h4>This triggers building FULL STACT Software to replace old desktop products.</h4>
            <h4>A typical hardware testing scenario, might be controlling hardware resources in the background. The user input and results output should be in a friendly GUI. Moreover, experiment results to be saved in a backend database.</h4>
            <h4>Additionally, one might showcase results to customers in an elegant manner, without jeoparadizing the security of work or compromising the company software.</h4>
            <h2>Integratedsuite is a platform, where one can design hardware solutions in Python, build components in React, and save or retrieve backend data using Django.</h2>
            <Divider />
            <Typography variant="h3">Why buying IntegratedSuite ?</Typography>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Utilizing huge online support for web development. " />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Fast prototyping for custom solutions in your company." />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Providing authenticated solutions with different access levels, where developers, customers, and managers can view." />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Cheap development utilizing open sources like Django, REST Framework, React, and Material UI." />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Automated Testing using web automated solutions like SELENIUM." />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Develop in premises, access from anywhere with reliable authentication." />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Support for building hardware and software solution, all in one place." />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Detailed documentation of the know-how of each part in the software" secondary="Online support and in premsis without additional cost." />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="MONEY BACK GUARANTEED, IF YOU AREN'T SATISFIED WITH IntegratedSuite FOR 2 WEEKS." />
                </ListItem>
            </List>
            <Divider />
            <Typography variant="h3">Software Technologies</Typography>
            <h4>Django framework for backend endpoints and models.</h4>
            <h4>REACT framework for frontend work.</h4>
            <h4>REST framework for reliable connections between backend and frontend.</h4>
            <h4>Webpack for JS bundling, where dev and production builds can be implemented.</h4>
            <h4>Local Postgresql for dev builds.</h4>
            <h4>Postgresql on RDS, was used for production builds.</h4>
            <h4>S3 for static content in both dev and production builds.</h4>
            <h4>Material UI for modern less code HTML5 and CSS3 stylish templates.</h4>
            <TitlebarImageList />
        </div>
    )
}
export default Disclaimer;

