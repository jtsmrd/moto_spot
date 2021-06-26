import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { setMapViewModeAction } from '../redux/Actions';
import RiderCheckinMeetupSelector from './RiderCheckinMeetupSelector';
import { MapViewMode } from '../redux/reducers/MapInfoReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bottomButtonContainer: {
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            position: 'absolute',
            bottom: '2rem',
        },
        meetupButton: {
            backgroundColor: 'rgba(18, 215, 255, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
        meetupButtonTitle: {
            fontSize: '1rem',
        },
    }),
);

const RiderMeetupView: React.FC<{}> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const createMeetup = useCallback(() => {
        dispatch(setMapViewModeAction({ mapViewMode: MapViewMode.CreateRiderMeetup }));
    }, [dispatch]);

    return (
        <div>
            <RiderCheckinMeetupSelector />
            <Box className={classes.bottomButtonContainer}>
                <Button className={classes.meetupButton} onClick={createMeetup}>
                    <Typography className={classes.meetupButtonTitle}>Create Meetup</Typography>
                </Button>
            </Box>
        </div>
    );
};

export default RiderMeetupView;
