import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AlertDialog( { mensaje, textoBoton1, textoBoton2, textoBotonTrigger, FuncionConfirmar } ) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
       { textoBotonTrigger }
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           { mensaje }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{textoBoton2}</Button>
          <Button onClick={ FuncionConfirmar } autoFocus>
          {textoBoton1}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialog;