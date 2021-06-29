import React from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, Dialog, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import * as Types from '../redux/Types';

export interface RiderMeetupInfoDialogProps {
    open: boolean;
    onClose: any;
    riderMeetup: Types.RiderMeetup;
}

interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        descriptionText: {
            marginBottom: '0.5rem',
        },
    }),
);

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton id="close-button" aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const RiderMeetupInfoDialog: React.FC<RiderMeetupInfoDialogProps> = (props) => {
    const { open, onClose, riderMeetup } = props;
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="meetup-title" onClose={onClose}>
                {riderMeetup?.title}
            </DialogTitle>
            <DialogContent dividers>
                <Typography id="meetup-description" className={classes.descriptionText}>
                    {riderMeetup?.description}
                </Typography>
                <Typography id="meetup-start-date">Starts: {riderMeetup?.meetupTimestamp}</Typography>
                <Typography id="meetup-expire-date">Ends: {riderMeetup?.expireTimestamp}</Typography>
            </DialogContent>
            {/*ToDo: Allow creator to edit, allow non-creator users to show interest*/}
            {/*<DialogActions>*/}
            {/*    <Button onClick={onClose} color="primary">*/}
            {/*        Edit*/}
            {/*    </Button>*/}
            {/*    <Button onClick={onClose} color="primary">*/}
            {/*        Interested*/}
            {/*    </Button>*/}
            {/*</DialogActions>*/}
        </Dialog>
    );
};

export default RiderMeetupInfoDialog;
