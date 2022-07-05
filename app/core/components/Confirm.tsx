import { PropsWithChildren, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Portal,
} from '@mui/material';

export default function AlertDialog({
    title,
    button,
    children,
    handleYes,
    handleNo,
    handleClose,
}: PropsWithChildren<{
    title: string;
    button: string;
    handleYes?: () => void;
    handleNo?: () => void;
    handleClose?: () => void;
}>) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                {button}
            </Button>
            <Portal container={document.body}>
                <Dialog
                    open={open}
                    onClose={() => {
                        close();
                        handleClose && handleClose();
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {children}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                close();
                                handleNo && handleNo();
                            }}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                close();
                                handleYes && handleYes();
                            }}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Portal>
        </>
    );
}
