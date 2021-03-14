import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MapContainer from './MapContainer';
import MapInfo from './MapInfo';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
        },
        gridContainer: {
            position: 'relative',
            height: '100%',
        },
        mapColumn: {
            position: 'relative',
        },
    }),
);

const Home: React.FC<{}> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className={classes.gridContainer}>
                <Grid item xs={12} lg={6} className={classes.mapColumn}>
                    <MapContainer />
                </Grid>
                <Grid item xs={12} lg={6} className={classes.mapColumn}>
                    <MapInfo />
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
