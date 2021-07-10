import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { getSelectedUserCheckin } from '../redux/Selectors';
import { setSelectedUserCheckinAction } from '../redux/Actions';
import CreateRiderCheckinDialog from './CreateRiderCheckinDialog';
import UserCheckinDialog from './UserCheckinDialog';
import RiderCheckinMeetupSelector from './RiderCheckinMeetupSelector';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        checkinButton: {
            position: 'absolute',
            right: '1rem',
            bottom: '3rem',
        },
    }),
);

const RiderCheckinView: React.FC<{}> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selectedUserCheckin = useSelector(getSelectedUserCheckin);
    const [checkinDialogVisible, setCheckinDialogVisible] = useState(false);
    const [userCheckinDialogVisible, setUserCheckinDialogVisible] = useState(false);

    useEffect(() => {
        setUserCheckinDialogVisible(selectedUserCheckin !== null);
    }, [selectedUserCheckin]);

    const onCloseUserCheckinDialog = useCallback(() => {
        dispatch(setSelectedUserCheckinAction({ userCheckin: null }));
    }, [dispatch]);

    return (
        <div>
            <RiderCheckinMeetupSelector />
            <Fab
                color="primary"
                aria-label="add"
                className={classes.checkinButton}
                onClick={() => {
                    setCheckinDialogVisible(true);
                }}
            >
                <AddIcon />
            </Fab>
            <CreateRiderCheckinDialog
                open={checkinDialogVisible}
                onClose={() => {
                    setCheckinDialogVisible(false);
                }}
            />
            <UserCheckinDialog open={userCheckinDialogVisible} onClose={onCloseUserCheckinDialog} />
        </div>
    );
};

export default RiderCheckinView;
