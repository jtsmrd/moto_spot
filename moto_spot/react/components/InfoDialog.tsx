import React from 'react';
import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

export interface InfoDialogProps {
    open: boolean;
    onClose: () => void;
    titleText: string;
    infoText: string;
}

interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

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
            <Box display="flex" alignItems="center">
                <Typography variant="h6">{children}</Typography>
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

const InfoDialog: React.FC<InfoDialogProps> = (props) => {
    const { open, onClose, titleText, infoText } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="info-title" onClose={onClose}>
                {titleText}
            </DialogTitle>
            <DialogContent dividers>
                <Typography id="info-text">{infoText}</Typography>
            </DialogContent>
        </Dialog>
    );
};

export default InfoDialog;
