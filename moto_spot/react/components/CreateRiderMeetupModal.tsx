import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, createStyles, Modal, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { getMapCenter } from '../redux/Selectors';
import { createRiderMeetupRequestAction } from '../redux/Actions';
import { formatUtcString } from '../utilities/dateTimeUtils';

export interface CreateRiderMeetupModalProps {
    open: boolean;
    onClose: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        meetupTimePicker: {
            margin: '1rem 0',
        },
        cancelButton: {
            backgroundColor: 'rgba(255, 18, 18, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
        submitButton: {
            backgroundColor: 'rgba(18, 215, 255, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
    }),
);

const CreateRiderMeetupModal: React.FC<CreateRiderMeetupModalProps> = (props) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const mapCenter = useSelector(getMapCenter);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [meetupDate, setMeetupDate] = useState(null);

    const meetupDateSelected = (date) => {
        setMeetupDate(formatUtcString(date));
    };

    const createMeetup = () => {
        dispatch(
            createRiderMeetupRequestAction({
                lat: mapCenter.lat,
                lng: mapCenter.lng,
                meetup_date: meetupDate,
            }),
        );
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography>Create new Meetup</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label="Set meetup time"
                            className={classes.meetupTimePicker}
                            inputVariant="outlined"
                            disablePast
                            value={selectedDate}
                            onChange={setSelectedDate}
                            onAccept={meetupDateSelected}
                        />
                    </MuiPickersUtilsProvider>
                    <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                        <Button className={classes.cancelButton} onClick={onClose}>
                            <Typography>Cancel</Typography>
                        </Button>
                        <Button className={classes.submitButton} onClick={createMeetup}>
                            <Typography>Submit</Typography>
                        </Button>
                    </Box>
                </Box>
            </div>
        </Modal>
    );
};

export default CreateRiderMeetupModal;
