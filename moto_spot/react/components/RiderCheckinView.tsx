import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { getSelectedUserCheckin } from '../redux/Selectors';
import { setSelectedUserCheckinAction } from '../redux/Actions';
import RiderCheckinDialog from './RiderCheckinDialog';
import UserCheckinDialog from './UserCheckinDialog';
import RiderCheckinMeetupSelector from './RiderCheckinMeetupSelector';

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
            <Box className={classes.bottomButtonContainer}>
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
