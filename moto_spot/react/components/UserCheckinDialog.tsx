import React, { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Dialog, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { expireRiderCheckinRequestAction, extendRiderCheckinRequestAction } from '../redux/Actions';
import { getUserCheckin } from '../redux/Selectors';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import InfoDialog from './InfoDialog';
import '../utilities/date.string.extensions';
import ConfirmDialog from './ConfirmDialog';

export interface UserCheckinDialogProps {
    open: boolean;
    onClose: () => void;
}

interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
    infoButtonSelected: () => void;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, infoButtonSelected, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">{children}</Typography>
                <IconButton id="info-button" aria-label="info" onClick={infoButtonSelected}>
                    <InfoOutlinedIcon />
                </IconButton>
            </Box>
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        extendButtonContainer: {
            margin: '1rem auto',
        },
        extendIntervalButton: {
            width: '50px',
        },
        extendIntervalButtonText: {
            textTransform: 'lowercase',
        },
        motorcycleMakeModelText: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontWeight: 300,
        },
        currentExpireTimeText: {
            marginBottom: '0.5rem',
        },
        expiresText: {
            marginTop: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: 300,
        },
        updateButton: {
            color: theme.palette.primary.main,
            textTransform: 'capitalize',
        },
        deleteButton: {
            color: theme.palette.secondary.main,
            textTransform: 'capitalize',
        },
    }),
);

const UserCheckinDialog: React.FC<UserCheckinDialogProps> = (props) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const userCheckin = useSelector(getUserCheckin);
    const [infoDialogVisible, setInfoDialogVisible] = useState(false);
    const [extendInterval, setExtendInterval] = useState(15);
    const [confirmDeleteDialogVisible, setConfirmDeleteDialogVisible] = useState(false);

    const currentExpireDateDisplay = useMemo(() => {
        return userCheckin?.expireDate.formatTodayTomorrowTime();
    }, [userCheckin]);

    const expireDateDisplay = useMemo(() => {
        return userCheckin?.expireDate.addMinutes(extendInterval).formatTodayTomorrowTime();
    }, [extendInterval, userCheckin]);

    const handleExtendIntervalSelected = (event: React.MouseEvent<HTMLElement>, extendInterval: number | null) => {
        setExtendInterval(extendInterval);
    };

    const infoButtonSelected = () => {
        setInfoDialogVisible(true);
    };

    const handleExtendCheckin = useCallback(() => {
        if (userCheckin) {
            dispatch(
                extendRiderCheckinRequestAction({
                    id: userCheckin.id,
                    extendInterval: extendInterval,
                }),
            );
        }

        onClose();
    }, [userCheckin, dispatch, extendInterval]);

    const onConfirmDeleteRiderCheckin = useCallback(() => {
        setConfirmDeleteDialogVisible(false);
        if (userCheckin) {
            dispatch(expireRiderCheckinRequestAction({ id: userCheckin.id }));
        }
        onClose();
    }, [userCheckin, dispatch]);

    return (
        <React.Fragment>
            <Dialog id="user-checkin-dialog" fullWidth open={open} onClose={onClose}>
                <DialogTitle id="user-checkin-title" onClose={onClose} infoButtonSelected={infoButtonSelected}>
                    Update Checkin
                </DialogTitle>
                <DialogContent dividers>
                    <Typography className={classes.motorcycleMakeModelText}>
                        {userCheckin?.motorcycleMakeModel}
                    </Typography>
                    <Typography className={classes.currentExpireTimeText}>
                        Your checkin will expire {currentExpireDateDisplay}.
                    </Typography>
                    <Typography id="user-checkin-extend-question">Do you want to extend it?</Typography>
                    <Box display="flex">
                        <ToggleButtonGroup
                            id="extend-interval-button-group"
                            className={classes.extendButtonContainer}
                            value={extendInterval}
                            exclusive
                            onChange={handleExtendIntervalSelected}
                        >
                            <ToggleButton id="extend-interval-15" value={15} className={classes.extendIntervalButton}>
                                <Typography className={classes.extendIntervalButtonText}>15m</Typography>
                            </ToggleButton>
                            <ToggleButton id="extend-interval-30" value={30} className={classes.extendIntervalButton}>
                                <Typography className={classes.extendIntervalButtonText}>30m</Typography>
                            </ToggleButton>
                            <ToggleButton id="extend-interval-60" value={60} className={classes.extendIntervalButton}>
                                <Typography className={classes.extendIntervalButtonText}>1h</Typography>
                            </ToggleButton>
                            <ToggleButton id="extend-interval-120" value={120} className={classes.extendIntervalButton}>
                                <Typography className={classes.extendIntervalButtonText}>2h</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Typography className={classes.expiresText}>Will be extended until {expireDateDisplay}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={'outlined'}
                        className={classes.deleteButton}
                        onClick={() => {
                            setConfirmDeleteDialogVisible(true);
                        }}
                    >
                        Delete
                    </Button>
                    <Button variant={'outlined'} className={classes.updateButton} onClick={handleExtendCheckin}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <InfoDialog
                open={infoDialogVisible}
                onClose={() => {
                    setInfoDialogVisible(false);
                }}
                titleText="Update Checkin"
                infoText="If you plan on hanging out a bit longer at your current
                    spot, you can extend your checkin time.
                    <br>
                    If you're leaving, you can delete your checkin before it expires."
            />
            <ConfirmDialog
                open={confirmDeleteDialogVisible}
                onClose={() => {
                    setConfirmDeleteDialogVisible(false);
                }}
                onConfirm={onConfirmDeleteRiderCheckin}
                cancelText={'Cancel'}
                confirmText={'Are you sure you want to delete your Checkin?'}
                confirmButtonText={'Yes, delete'}
                confirmIsDestructive={true}
            />
        </React.Fragment>
    );
};

export default UserCheckinDialog;
