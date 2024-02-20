//React
import React, {FC} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import TitlebarImageList from './TitleBarImage';

const styles = {
    root: {
        width: '100%',
        maxWidth: '150ch',
    },
    inline: {
        display: 'inline',
    },
};

const Disclaimer: FC = () => {
    return (
        <div>
            <Typography variant="h3">Disclaimer:</Typography>
            <h2>IntegratedSuite is a FULL STACK project meant to demonstrate mastering of REST API, MySQL CRUD concepts with NodeJs & React.</h2>
            <h2>It uses NodeJs with Typescript for backend support</h2>
            <h2>React with TSX for frontend.</h2>
            <h2>Express web server for REST API handling.</h2>
            <h2>MySQL database for backend database with localhost version for development and JAWSDB for production on Heroku.</h2>
            <h2>Webpack for bundling files.</h2>
            <h2>MUI-5 for stylish html templates.</h2>
            <h2>Heroku for production deployment.</h2>
            <h2>Selenium for automated testing of webpages.</h2>
            <Divider />
            <TitlebarImageList />
        </div>
    )
}
export default Disclaimer;

