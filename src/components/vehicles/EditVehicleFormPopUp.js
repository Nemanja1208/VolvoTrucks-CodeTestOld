import React from 'react'

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import './EditVehicleFormPopUp.css';

function EditVehicleFormPopUp({
    updateVehicleData,
    setUpdateVehicleData,
    equipment,
    openEditVehicleForm,
    handleCloseEditVehicleForm,
    handleCheckboxState,
    handleChangedEquipmentCheckbox,
    updateVehicle })    
{
  
    // STYLING MATERIAL UI
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    form: {
      display: "flex",
      flexDirection: "row",
      margin: theme.spacing(1),
    },
    textFields: {
      margin: theme.spacing(1),
      width: '25ch',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

  }));
  const classes = useStyles();
    
    return (
        <div>
            <Dialog
            fullWidth="true"
            maxWidth="lg"
            open={openEditVehicleForm}
            onClose={handleCloseEditVehicleForm}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{" Edit the Vehicle "}</DialogTitle>
            <div className="editVehicleForm">
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  className={classes.textFields}
                  id="outlined-basic"
                  label="Vehicle Registration number"
                  variant="outlined"
                  onChange={e => setUpdateVehicleData(updateVehicleData => ({
                    ...updateVehicleData, name: e.target.value
                  }))}
                  value={updateVehicleData.name || ''}
                />
                <Tooltip title="If you change the name, the image will disappear" aria-label="If you change the name, the image will disappear">
                <TextField
                  className={classes.textFields}
                  id="outlined-basic"
                  label="Vehicle Driver"
                  variant="outlined"
                  onChange={e => setUpdateVehicleData(updateVehicleData => ({
                    ...updateVehicleData, driver: e.target.value
                  }))}
                  value={updateVehicleData.driver || ''}
                />
                </Tooltip>
                <TextField
                  className={classes.textFields}
                  id="outlined-basic"
                  label="Vehicle Fuel Type"
                  variant="outlined"
                  onChange={e => setUpdateVehicleData(updateVehicleData => ({
                    ...updateVehicleData, fuelType: e.target.value
                  }))}
                  value={updateVehicleData.fuelType || ''}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={e => setUpdateVehicleData(updateVehicleData => ({
                      ...updateVehicleData, status: e.target.value
                    }))}
                    value={updateVehicleData.status || ''}
                    label="Status"
                  >
                    <MenuItem value={"active"}>Active</MenuItem>
                    <MenuItem value={"inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
                {equipment ?
                  equipment.map((equipmentPart) => {
                    return(
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={updateVehicleData.equipments.some(item => item === equipmentPart.id)}
                          name={equipmentPart.name}
                          onChange={(e) => {
                            handleCheckboxState(updateVehicleData.equipments.some(item => item === equipmentPart.id));
                            handleChangedEquipmentCheckbox(equipmentPart.id);
                          }}
                        />
                        }
                        label={equipmentPart.name}
                    />)
                  }) :
                  equipment.map((equipmentPart) => {
                    return(
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={false}
                          name={equipmentPart.name}
                        />
                        }
                        label={equipmentPart.name}
                    />)
                  })
                  }

              </form>
            </div>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={updateVehicle} >
                SAVE CHANGES
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCloseEditVehicleForm} >
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
}

export default EditVehicleFormPopUp
