import React, {FC} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import react from './../../static/images/react.png';
import nodejs from './../../static/images/nodejs.png';
import webpack from './../../static/images/webpack.png';
import mysql from './../../static/images/mysql.png';
import express from './../../static/images/express.png';
import heroku from './../../static/images/heroku.png';
import materialui from './../../static/images/materialui.png';
import selenium from './../../static/images/selenium.png';
import s3 from './../../static/images/s3.png';
import aws from './../../static/images/aws.png';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContentContent: 'space-around',
        overflow: 'hidden',
    },
    imageList: {
        width: 600,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};


const itemData = [
    {
        img: react,
        title: 'REACT',
        purpose: 'Frontend',
        alt: 'react',
    },
    {
        img: nodejs,
        title: 'Nodejs',
        purpose: 'Backend',
        alt: 'nodejs',
    },
    {
        img: webpack,
        title: 'Webpack',
        purpose: 'JS Bundling',
        alt: 'webpack',
    },
    {
        img: mysql,
        title: 'POSTGRES SQL',
        purpose: 'Local database',
        alt: 'postgres',
    },
    {
        img: express,
        title: 'express',
        purpose: 'JSON serializing',
        alt: 'express',
    }, {
        img: s3,
        title: 'S3 BUCKETS',
        purpose: 'Static online storage',
        alt: 's3',
    }, {
        img: heroku,
        title: 'HEROKU',
        purpose: 'Free Internet web deployment',
        alt: 'heorku',
    }, {
        img: aws,
        title: 'AWS',
        purpose: 'Cloud to hold S3 and RDS',
        alt: 'aws',
    }, {
        img: materialui,
        title: 'MATERIAL-UI',
        purpose: 'Material-ui for HTML and CSS templating',
        alt: 'materialui',
    }, {
        img: selenium,
        title: 'SELENIUM',
        purpose: 'webdriver for automated web testing',
        alt: 'materialui',
    },
];

const TitleBarImage: FC = () => {
    return (
        //missing style for div
        <div >
            <ImageList rowHeight={180} sx={styles.imageList}>
                <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                </ImageListItem>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img src={item.img} alt={item.title} />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={<span>{item.purpose}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${item.title}`} sx={styles.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default TitleBarImage;