import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { getSelectedUserCheckin, getVisibleRiderCheckins } from '../redux/Selectors';
import { setCreateMeetupViewStateAction, setSelectedUserCheckinAction } from '../redux/Actions';
import RiderCheckinDialog from './RiderCheckinDialog';
import UserCheckinDialog from './UserCheckinDialog';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        numberOfRidersContainer: {
            zIndex: 1,
            width: '100%',
            textAlign: 'center',
            position: 'absolute',
            top: '1rem',
        },
        numberOfRidersText: {
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 192, 18, 0.5)',
            padding: '1rem 2rem',
            borderRadius: '1rem',
            border: '1px solid gray',
            fontSize: '1rem',
            [theme.breakpoints.up('sm')]: {
                fontSize: '2rem',
            },
        },
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
        checkinButton: {
            backgroundColor: 'rgba(18, 215, 255, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
        checkinButtonTitle: {
            fontSize: '1rem',
        },
    }),
);

const RiderCheckinView: React.FC<{}> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const visibleRiderCheckins = useSelector(getVisibleRiderCheckins);
    const selectedUserCheckin = useSelector(getSelectedUserCheckin);
    const [checkinDialogVisible, setCheckinDialogVisible] = useState(false);
    const [userCheckinDialogVisible, setUserCheckinDialogVisible] = useState(false);

    useEffect(() => {
        setUserCheckinDialogVisible(selectedUserCheckin !== null);
    }, [selectedUserCheckin]);

    const setMeetupViewState = useCallback(
        (isCreating) => {
            dispatch(setCreateMeetupViewStateAction({ isCreatingMeetup: isCreating }));
        },
        [dispatch],
    );

    const onCloseUserCheckinDialog = useCallback(() => {
        dispatch(setSelectedUserCheckinAction({ userCheckin: null }));
    }, [dispatch]);

    return (
        <div>
            <Box className={classes.numberOfRidersContainer}>
                <Typography className={classes.numberOfRidersText}>
                    Number of riders: {visibleRiderCheckins.length}
                </Typography>
            </Box>
            <Box className={classes.bottomButtonContainer}>
                <Button
                    className={classes.meetupButton}
                    onClick={() => {
                        setMeetupViewState(true);
                    }}
                >
                    <Typography className={classes.meetupButtonTitle}>Create Meetup</Typography>
                </Button>
                <Button
                    className={classes.checkinButton}
                    onClick={() => {
                        setCheckinDialogVisible(true);
                    }}
                >
                    <Typography className={classes.checkinButtonTitle}>Check In</Typography>
                </Button>
            </Box>
            <RiderCheckinDialog
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
