import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface UserCheckinDialogProps {
    open: boolean;
    onClose: any;
    onExtend: any;
    onDelete: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteButton: {
            color: 'red',
        },
    }),
);

const UserCheckinDialog: React.FC<UserCheckinDialogProps> = (props) => {
    const { open, onClose, onExtend, onDelete } = props;
    const classes = useStyles();

    const extendOptions = [
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
    ];
    const deleteOption = { title: 'Remove', value: -1 };

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Extend or remove your Rider Checkin</DialogTitle>
            <List>
                {extendOptions.map((option) => (
                    <ListItem button onClick={() => onExtend(option.value)} key={option.value}>
                        <ListItemText primary={option.title} />
                    </ListItem>
                ))}
                <ListItem button onClick={onDelete} key={deleteOption.value}>
                    <ListItemText className={classes.deleteButton} primary={deleteOption.title} />
                </ListItem>
            </List>
        </Dialog>
    );
};

export default UserCheckinDialog;
