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
import EditRiderMeetupDialog from './EditRiderMeetupDialog';

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
    const [meetupInfoDialogVisible, setMeetupInfoDialogVisible] = useState(false);
    const [editMeetupInfoDialogVisible, setEditMeetupInfoDialogVisible] = useState(false);

    useEffect(() => {
        setMeetupInfoDialogVisible(selectedRiderMeetup !== null && !editMeetupInfoDialogVisible);
    }, [selectedRiderMeetup]);

    const createRiderMeetup = useCallback(() => {
        dispatch(setMapViewModeAction({ mapViewMode: MapViewMode.CreateRiderMeetup }));
    }, [dispatch]);

    const onCloseRiderMeetupDialog = useCallback(() => {
        dispatch(setSelectedRiderMeetupAction({ riderMeetup: null }));
    }, [dispatch]);

    const onEditRiderMeetup = useCallback(() => {
        setMeetupInfoDialogVisible(false);
        setEditMeetupInfoDialogVisible(true);
    }, []);

    const onCloseEditRiderMeetupDialog = useCallback(() => {
        setEditMeetupInfoDialogVisible(false);
        setMeetupInfoDialogVisible(true);
    }, []);

    const onRiderMeetupExpired = useCallback(() => {
        setEditMeetupInfoDialogVisible(false);
        dispatch(setSelectedRiderMeetupAction({ riderMeetup: null }));
    }, [dispatch]);

    return (
        <div>
            <RiderCheckinMeetupSelector />
            <Fab color="secondary" aria-label="add" className={classes.meetupButton} onClick={createRiderMeetup}>
                <AddIcon />
            </Fab>
            <RiderMeetupInfoDialog
                open={meetupInfoDialogVisible}
                onClose={onCloseRiderMeetupDialog}
                onEditRiderMeetup={onEditRiderMeetup}
                riderMeetup={selectedRiderMeetup}
            />
            {selectedRiderMeetup && (
                <EditRiderMeetupDialog
                    open={editMeetupInfoDialogVisible}
                    onClose={onCloseEditRiderMeetupDialog}
                    onExpire={onRiderMeetupExpired}
                    riderMeetup={selectedRiderMeetup}
                />
            )}
        </div>
    );
};

export default RiderMeetupView;
