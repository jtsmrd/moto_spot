import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { setMapViewModeAction } from '../redux/Actions';
import RiderCheckinMeetupSelector from './RiderCheckinMeetupSelector';
import { MapViewMode } from '../redux/reducers/MapInfoReducer';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        meetupButton: {
            position: 'absolute',
            right: '1rem',
            bottom: '3rem',
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
            <Fab color="secondary" aria-label="add" className={classes.meetupButton} onClick={createMeetup}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default RiderMeetupView;
