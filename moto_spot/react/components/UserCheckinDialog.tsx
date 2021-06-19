import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { expireRiderCheckinRequestAction, extendRiderCheckinRequestAction } from '../redux/Actions';
import { getUserCheckin } from '../redux/Selectors';

export interface UserCheckinDialogProps {
    open: boolean;
    onClose: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteButton: {
            color: 'red',
        },
    }),
);

const UserCheckinDialog: React.FC<UserCheckinDialogProps> = (props) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const userCheckin = useSelector(getUserCheckin);

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
    const removeOption = { title: 'Remove', value: -1 };

    const extendCheckin = useCallback(
        (extendInterval) => {
            if (userCheckin) {
                dispatch(
                    extendRiderCheckinRequestAction({
                        id: userCheckin.id,
                        extendInterval: extendInterval,
                    }),
                );
            }

            onClose();
        },
        [userCheckin, dispatch],
    );

    const expireCheckin = useCallback(() => {
        if (userCheckin) {
            dispatch(expireRiderCheckinRequestAction({ id: userCheckin.id }));
        }

        onClose();
    }, [userCheckin, dispatch]);

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Extend or remove your Rider Checkin</DialogTitle>
            <List>
                <ListItem button onClick={() => extendCheckin(extendOptions[0].value)} key={extendOptions[0].value}>
                    <ListItemText primary={extendOptions[0].title} />
                </ListItem>
                <ListItem button onClick={expireCheckin} key={removeOption.value}>
                    <ListItemText className={classes.deleteButton} primary={removeOption.title} />
                </ListItem>
            </List>
        </Dialog>
    );
};

export default UserCheckinDialog;
