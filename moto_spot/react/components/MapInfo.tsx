import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { getMap } from '../redux/Selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            backgroundColor: 'lightblue',
            [theme.breakpoints.down('md')]: {
                height: '50vh',
            },
        },
    }),
);

const MapInfo: React.FC<{}> = (props) => {
    const classes = useStyles();
    const mapInfo = useSelector(getMap);
    console.log('mapInfo: ', mapInfo);
    return (
        <div className={classes.root}>
            <h1>MotoSpot</h1>
            <p>Number of riders:</p>
            <Button>Check in</Button>
        </div>
    );
};

export default MapInfo;