import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';

export interface RiderCheckinDialogProps {
    open: boolean;
    onCheckin: any;
    onClose: any;
}

const RiderCheckinDialog: React.FC<RiderCheckinDialogProps> = (props) => {
    const { open, onCheckin, onClose } = props;

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

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">How long do you plan to stay?</DialogTitle>
            <List>
                {expireOptions.map((option) => (
                    <ListItem button onClick={() => onCheckin(option.value)} key={option.value}>
                        <ListItemText primary={option.title} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};

export default RiderCheckinDialog;