const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 5000;

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// default route for server
app.get('/', (req, res) => res.status(200).send({
    message: "Server is running..."
}));

const AddVehicleToJsonFileAsync = async (vehicleToEditOrAddOrDelete) => {
    fs.writeFile('./src/data/vehicles.json', vehicleToEditOrAddOrDelete, (err) => {
        console.log(vehicleToEditOrAddOrDelete);
        if(err) {
            console.log(err);
        } else {
            console.log('Finished with writing to vehicles.json');
        }
    })
}

// Declaring post/write route for incoming data requests
app.post('/write', async (req, res, next) => {
    // take the body from request
    const requestContent = JSON.stringify(req.body, null, "\t");
    await AddVehicleToJsonFileAsync(requestContent);
});


// 404
app.get((req, res, next) => res.status(404).send({
    message: "Could not find specified route on this request..."
}));

// Run server
app.listen(port,() => {
    console.log(
        `
        !!! server is running
        !!! Listening for incoming requests on port ${port}
        !!! http://localhost:5000
        `
    )
} );