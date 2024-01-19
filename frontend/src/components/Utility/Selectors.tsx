//React
import React, { useState, useContext, useEffect } from "react";
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
//Context provider
import { SensorFormContext } from "../../contexts/SensorFormContext";
//Material ui
import Grid from "@mui/material/Grid";
import ScrollableTabs from "./ScrollableTab";
import Selector from "./Selector";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow.js';
import canon from './../static/images/canon.png';
import hitachi from './../static/images/hitachi.png';
import bluebox from './../static/images/bluebox.png';
import yellowbox from './../static/images/yellowbox.png';
import sensor1 from './../static/images/sensor1.png';
import sensor2 from './../static/images/sensor2.png';

//Custom libraries
// import { URL } from './constants.js';
// //Third party libraries
// import aws from 'aws-sdk';

// Configure aws with your accessKeyId and your secretAccessKey during DEV
// aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
// });
// const albumBucketName = process.env.AWS_STORAGE_BUCKET_NAME;

// // Show the photos that exist in an album.
// const s3 = new aws.S3({
//     apiVersion: '2006-03-01',
//     params: {
//         Bucket: albumBucketName,
//     }
// });

const styles = {
    button: {
        height: '40px',
        width: '100px',
        marginTop: '40px',
        marginBottom: '40px',
        marginLeft: '20px',
        marginRight: '20px',
    } 
};    

type Props = {
    disabled: boolean,
}

const Selectors: React.FC<{}> = ({ }) => { 

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


    //Hooks
    const [boxes, setBoxes] = useState<MyRecord[]>([]);
    const [companies, setCompanies] = useState<MyRecord[]>([]);
    const [sensors, setSensors] = useState<MyRecord[]>([]);
    const [slots, handleSlots] = useState<MyRecord[]>([]);
    const { sensorFormOnOff } = useContext(SensorFormContext);

    const handleClick = () => {
        console.log(`sensorFormOnOff: ${sensorFormOnOff}`);
    }

    //Handlers
    // function viewAlbum(albumName) {
    //     const albumPhotosKey = encodeURIComponent(albumName) + '/';
    //     s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
    //         if (err) {
    //             return alert('There was an error viewing your album: ' + err.message);
    //         }
    //         // 'this' references the AWS.Request instance that represents the response
    //         const href = this.request.httpRequest.endpoint.href;
    //         const bucketUrl = href + albumBucketName + '/';
    //         const photoUrls = data.Contents.map(photo => ({ 'src': bucketUrl + photo['Key'], 'name': photo['Key'] }));
    //         if (albumName === 'Company')
    //             setCompanies(photoUrls);
    //         else if (albumName === 'Box')
    //             setBoxes(photoUrls);
    //         else if (albumName === 'Sensor')
    //             setSensors(photoUrls);
    //     });
    // }
    // useEffect(() => { viewAlbum('Company') }, []);
    // useEffect(() => { viewAlbum('Box') }, []);
    // useEffect(() => { viewAlbum('Sensor') }, []); 
    // }

    // // const handleClick = e => {
    //     e.preventDefault();
    //     setselectorDisabled(() => { return false });
    //     setutilityDisabled(() => { return true });
    //     const a = selector['Sensor'];
    //     const v = parseInt(a.charAt(a.length - 1));
    //     setSlots({ 'slot0': (v - 1).toString(), 'slot1': v.toString() });

    return (
        <div>
            <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                    <Grid container direction="row" alignItems='flex-start' spacing={1}>
                        <Grid item xs={3}>
                            <Selector label='Company' records={MyCompanies} />
                        </Grid>
                        <Grid item xs={3}>
                            <Selector label='Box' records={MyBoxes} />
                        </Grid>
                        <Grid item xs={3}>
                            <Selector label="Sensor" records={MySensors} />
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PlayArrowIcon />} sx={styles.button} disabled={!sensorFormOnOff} size='large' variant='contained' color='primary' onClick={handleClick}>Submit</Button>
                        </Grid>
                    </Grid>
                    <ScrollableTabs />
                </Grid>
            </Grid>
        </div>
    );
}

export default Selectors;




