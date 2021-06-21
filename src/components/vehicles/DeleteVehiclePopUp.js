import React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteVehiclePopUp({ openDeleteAlert,handleCloseDeleteAlert,deleteVehicle,vehicle }) {
  return (
    <Dialog
      open={openDeleteAlert}
      onClose={handleCloseDeleteAlert}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
    <DialogTitle id="alert-dialog-slide-title">{"Are you sure that you want to delete this vehicle ? "}</DialogTitle>
    <DialogActions>
      <Button variant="contained" onClick={() =>  deleteVehicle(vehicle.id) } color="secondary">
        Yes, Delete
      </Button>
      <Button variant="contained" color="primary" onClick={handleCloseDeleteAlert} >
        No, take me back
      </Button>
    </DialogActions>
    </Dialog>
  )
}

export default DeleteVehiclePopUp
