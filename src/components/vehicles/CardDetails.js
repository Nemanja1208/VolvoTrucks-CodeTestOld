import React from 'react';
import equipmentData from '../../data/equipments.json';

import './VehicleCardDetails.css';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';
import PersonPinOutlinedIcon from '@material-ui/icons/PersonPinOutlined';
import ExtensionOutlinedIcon from '@material-ui/icons/ExtensionOutlined';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

function CardDetails({
    vehicle,
    populateVehicleOnEdit,
    handleOpenEditVehicleForm,
    handleOpenDeleteAlert
    }) 
{

// STYLING MATERIAL UI
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

    return (
        <div key={vehicle.id} className="card" >
        <div className="container">
            <img src={ `images/` + vehicle.driver + `.jpg` } alt={vehicle.driver} ></img>
        </div>
        <div className="details">
        <h3><DirectionsCarOutlinedIcon /> REG NUMBER : {vehicle.name}</h3>
        <h3><PersonPinOutlinedIcon /> DRIVER : {vehicle.driver}</h3>
        <h3><LocalGasStationIcon /> FUEL TYPE : {vehicle.fuelType}</h3>
        <div className="equipmentdiv">
          <h3><ExtensionOutlinedIcon /> Equipment : </h3>
          { vehicle.equipments != null ? vehicle.equipments.map(element =>  
            <li key={element.id}>{equipmentData.find(e => e.id === element).name} 
            </li>
          ) : null
        }
        </div>
        <Button
            className={classes.button}
            variant="contained"
            color="default"
            startIcon={<EditOutlinedIcon />}
            onClick={() => {populateVehicleOnEdit(vehicle); handleOpenEditVehicleForm();}}
        >
            Edit
        </Button>
        <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleOpenDeleteAlert}
          >
            Delete
        </Button>
        </div>    
    </div>
    )
}

export default CardDetails
