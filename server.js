// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, listeningTo);

function listeningTo() {
  console.log(`Server is up and running at localhost:${port}`);
}

app.get('/all', getData);

function getData(request, response){
  response.send(projectData);
  projectData = [];
}

app.post('/add', saveData);

function saveData(request, response){
  newData = {
    date: request.body.date,
    temp: request.body.temp,
    feeling: request.body.feeling
  }
  projectData.push(newData);
  console.log(projectData);
}
