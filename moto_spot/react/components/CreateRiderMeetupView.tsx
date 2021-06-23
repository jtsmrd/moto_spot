import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { setCreateMeetupViewStateAction } from '../redux/Actions';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import CreateRiderMeetupModal from './CreateRiderMeetupModal';

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
        cancelButton: {
            backgroundColor: 'rgba(18, 215, 255, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
        cancelButtonTitle: {
            fontSize: '1rem',
        },
        confirmButton: {
            backgroundColor: 'rgba(18, 215, 255, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
        confirmButtonTitle: {
            fontSize: '1rem',
        },
        meetupReticleContainer: {
            position: 'absolute',
            zIndex: 1,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
    }),
);

const CreateRiderMeetupView: React.FC<{}> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [meetupModalVisible, setMeetupModalVisible] = useState(false);

    const setMeetupViewState = useCallback(
        (isCreating) => {
            dispatch(setCreateMeetupViewStateAction({ isCreatingMeetup: isCreating }));
        },
        [dispatch],
    );

    return (
        <div>
            <Box className={classes.meetupReticleContainer}>
                <GpsNotFixedIcon color={'primary'} />
            </Box>
            <Box className={classes.bottomButtonContainer}>
                <Button
                    className={classes.cancelButton}
                    onClick={() => {
                        setMeetupViewState(false);
                    }}
                >
                    <Typography className={classes.cancelButtonTitle}>Cancel</Typography>
                </Button>
                <Button
                    className={classes.confirmButton}
                    onClick={() => {
                        setMeetupModalVisible(true);
                    }}
                >
                    <Typography className={classes.confirmButtonTitle}>Confirm</Typography>
                </Button>
            </Box>
            <CreateRiderMeetupModal
                open={meetupModalVisible}
                onClose={() => {
                    setMeetupModalVisible(false);
                }}
            />
        </div>
    );
};

export default CreateRiderMeetupView;
