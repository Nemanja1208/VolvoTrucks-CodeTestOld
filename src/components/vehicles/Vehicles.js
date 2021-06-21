//Important
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import vehicleData from '../../data/vehicles.json';
import equipmentData from '../../data/equipments.json';
import CardDetails from '../vehicles/CardDetails';
import EditVehicleFormPopUp from './EditVehicleFormPopUp';
import DeleteVehiclePopUp from './DeleteVehiclePopUp';

// Material UI & Styling
import './Vehicles.css';
import LensIcon from '@material-ui/icons/Lens';

const Vehicles = () => {

  // State
  const [vehicles, setVehicles] = useState(vehicleData);
  // eslint-disable-next-line
  const [equipment, setEquipment] = useState(equipmentData);

  // TEMP STATE - used for passing data from vehicle to vehicle-form in order to change and later update
  const [updateVehicleData, setUpdateVehicleData] = useState();

  // EFFECT
  useEffect(() => {
  }, [vehicles])
  

  // POPULATE the DIALOG popup FORM WITH VEHICLE DATA ON EDIT VEHICLE

  const populateVehicleOnEdit = (vehicle) => {
    setUpdateVehicleData({
      id: vehicle.id,
      name: vehicle.name,
      driver: vehicle.driver,
      status: vehicle.status,
      fuelType: vehicle.fuelType,
      equipments: vehicle.equipments || []
    });
  }

  // UPDATE VEHICLE

  const updateVehicle = () => {

    // Using already populated and or updated/edited vehicle-form data from temp state and preparing new object for updating vehicle in both state and JSON file
    let UpdatedVehicle = {
      id: updateVehicleData.id || '',
      name: updateVehicleData.name || '',
      driver: updateVehicleData.driver || '',
      status: updateVehicleData.status || '',
      fuelType: updateVehicleData.fuelType || '',
      equipments: updateVehicleData.equipments || []
    }

    // Finding the index of the vehicle that is going to be updated and updating the whole JSON file as well
    let indexOfTheUpdatedVehicle = vehicles.findIndex((element => element.id === updateVehicleData.id));

    vehicles[indexOfTheUpdatedVehicle] = UpdatedVehicle; // updating the element directly with index 

    let vehiclesAfterUpdate = vehicles; // passing the value of all vehicles after updating

    // Updating vehicles and then clearing out the updateData after finished action
    setVehicles(vehiclesAfterUpdate);
    setUpdateVehicleData();

    // Updating the JSON file as well
    saveToVehicleJSONFile(vehiclesAfterUpdate);
  }

    // DELETE VEHICLE

  const deleteVehicle = (id) => {
    let allVehiclesAfterDeleting = [...vehicles].filter(OBJ => OBJ.id !== id);
    setVehicles(allVehiclesAfterDeleting);
    setOpenDeleteAlert(false);

    //DELETE FROM JSON FILE
    saveToVehicleJSONFile(allVehiclesAfterDeleting);
    
  }

  // WRITE TO JSON FILE

  // Function will receive all updates of state / vehicles after ADD,UPDATE,DELETE

  const saveToVehicleJSONFile = (vehicles) => {
    // API URL -> endpoint from node server / express server
    const url = 'http://localhost:5000/write'
    axios.post(url, vehicles)
    .then(response => {
      // console.log(response);
    });
  }
  
  // EDIT POPUP - DIALOG MATERIAL UI
  const [openEditVehicleForm, setOpenEditVehicleForm] = useState(false);

  const handleOpenEditVehicleForm = () => {
    setOpenEditVehicleForm(true);
  };

  const handleCloseEditVehicleForm  = () => {
    setOpenEditVehicleForm(false);
  };

  // ALERT POPUP DELETE - DIALOG MATERIAL UI
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  // CHECKBOX STATE
  const [checkboxState, setCheckboxState] = useState();

  const handleCheckboxState = (boolean) => {
    setCheckboxState(!boolean);
  }

  // CHANGING EQUIPMENT ARRAY
  const handleChangedEquipmentCheckbox = (id) => {
    let equipmentItems = updateVehicleData.equipments;
    equipmentItems.push(id);
    let equipmentItemsRemoveFrom = equipmentItems.filter(ITEM => ITEM !== id);

    if(checkboxState){
      setUpdateVehicleData(updateVehicleData => ({
      ...updateVehicleData, equipments: equipmentItems
    }))} else {
      setUpdateVehicleData(updateVehicleData => ({
        ...updateVehicleData, equipments: equipmentItemsRemoveFrom
    }))}
  }

  return (
    <div className="vehicles">
      <h1>MY FLEET</h1>

      {updateVehicleData ? (
        <div>
          <EditVehicleFormPopUp
            updateVehicleData={updateVehicleData}
            setUpdateVehicleData={setUpdateVehicleData}
            equipment={equipment}
            openEditVehicleForm={openEditVehicleForm}
            handleCloseEditVehicleForm={handleCloseEditVehicleForm}
            handleCheckboxState={handleCheckboxState}
            handleChangedEquipmentCheckbox={handleChangedEquipmentCheckbox}
            updateVehicle={updateVehicle}
          />
        </div>
      ) : null }

      <div className="cards">
        { vehicles ? vehicles.map(vehicle => {
          return(
            <div key={vehicle.id} className="card" >
            <CardDetails
              vehicle={vehicle}
              populateVehicleOnEdit={populateVehicleOnEdit}
              handleOpenEditVehicleForm={handleOpenEditVehicleForm}
              handleOpenDeleteAlert={handleOpenDeleteAlert}
            />
            <DeleteVehiclePopUp
              openDeleteAlert={openDeleteAlert}
              handleCloseDeleteAlert={handleCloseDeleteAlert}
              deleteVehicle={deleteVehicle}
              vehicle={vehicle}
            />
            <div className="activestatus">
                {vehicle.status === "active" ? (<p>ACTIVE <LensIcon style={{fill: "green"}} /></p>) : (<p>INACTIVE <LensIcon style={{fill: "red"}} /> </p>) }
            </div>
          </div>
          )
        }) : null }
      </div>
    </div>
  );
};

export default Vehicles;
