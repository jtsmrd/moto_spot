import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import { createRiderCheckinRequestAction } from '../redux/Actions';
import { getUtcIntervalAddingMinutes } from '../utilities/dateTimeUtils';
import { usePosition } from '../hooks/usePosition';

export interface RiderCheckinDialogProps {
    open: boolean;
    onClose: any;
}

const RiderCheckinDialog: React.FC<RiderCheckinDialogProps> = (props) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const { positionLat, positionLng, positionError } = usePosition();

    const expireOptions = [
        {
            title: '15 minutes',
            value: 15,
        },
        {
            title: '30 minutes',
            value: 30,
        },
        {
            title: '1 hour',
            value: 60,
        },
        {
            title: 'Skip',
            value: null,
        },
    ];

    useEffect(() => {
        if (positionError) {
            alert(positionError);
        }
    }, [positionError]);

    const handleCheckin = useCallback(
        (expireInterval) => {
            if (positionLat && positionLng) {
                dispatch(
                    createRiderCheckinRequestAction({
                        lat: positionLat,
                        lng: positionLng,
                        expire_date: expireInterval ? getUtcIntervalAddingMinutes(expireInterval) : null,
                    }),
                );
            } else {
                alert('You must enable location to checkin');
            }

            onClose();
        },
        [positionLat, positionLng, dispatch],
    );

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">How long do you plan to stay?</DialogTitle>
            <List>
                {expireOptions.map((option) => (
                    <ListItem button onClick={() => handleCheckin(option.value)} key={option.value}>
                        <ListItemText primary={option.title} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};

export default RiderCheckinDialog;
