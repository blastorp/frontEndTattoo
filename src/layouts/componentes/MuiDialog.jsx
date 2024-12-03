import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// function MuiDialog( { mensaje, textoBoton1, textoBoton2, textoBotonTrigger, setConfirmado, confirmado } ) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const funcionConfirmar = () => {
//     setConfirmado(true);
//     console.log(confirmado);
//     handleClose();
//   }

//   return (
//     <React.Fragment>
//       <Button 
//       variant="contained"
//        color="success"
//        onClick={handleClickOpen}
//        sx={{ color: "white", mb: 2 }}>
//        { textoBotonTrigger }
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Confirmacion"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//            { mensaje }
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>{textoBoton2}</Button>
//           <Button onClick={ funcionConfirmar } autoFocus>
//           {textoBoton1}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }



// export default MuiDialog;

function MuiDialog({
  mensaje,
  textoBoton1,
  textoBoton2,
  textoBotonTrigger,
  onConfirm, // Nuevo prop
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const funcionConfirmar = () => {
    if (onConfirm) {
      onConfirm(); // Ejecutar el callback pasado como prop
    }
    handleClose(); // Cerrar el diálogo
  };

  return (
    <React.Fragment>
      <span onClick={handleClickOpen} style={{ cursor: "pointer" }}>
        {textoBotonTrigger} 
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{textoBoton2}</Button>
          <Button onClick={funcionConfirmar} autoFocus>
            {textoBoton1}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MuiDialog;
