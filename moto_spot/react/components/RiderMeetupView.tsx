import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { setMapViewModeAction, setSelectedRiderMeetupAction } from '../redux/Actions';
import RiderCheckinMeetupSelector from './RiderCheckinMeetupSelector';
import { MapViewMode } from '../redux/reducers/MapInfoReducer';
import AddIcon from '@material-ui/icons/Add';
import * as Types from '../redux/Types';
import { getSelectedRiderMeetup } from '../redux/Selectors';
import RiderMeetupInfoDialog from './RiderMeetupInfoDialog';

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
    const selectedRiderMeetup: Types.RiderMeetup = useSelector(getSelectedRiderMeetup);
    const [meetupDialogVisible, setMeetupDialogVisible] = useState(false);

    useEffect(() => {
        setMeetupDialogVisible(selectedRiderMeetup !== null);
    }, [selectedRiderMeetup]);

    const createMeetup = useCallback(() => {
        dispatch(setMapViewModeAction({ mapViewMode: MapViewMode.CreateRiderMeetup }));
    }, [dispatch]);

    const onCloseRiderMeetupDialog = useCallback(() => {
        dispatch(setSelectedRiderMeetupAction({ riderMeetup: null }));
    }, [dispatch]);

    return (
        <div>
            <RiderCheckinMeetupSelector />
            <Fab color="secondary" aria-label="add" className={classes.meetupButton} onClick={createMeetup}>
                <AddIcon />
            </Fab>
            <RiderMeetupInfoDialog
                open={meetupDialogVisible}
                onClose={onCloseRiderMeetupDialog}
                riderMeetup={selectedRiderMeetup}
            />
        </div>
    );
};

export default RiderMeetupView;
