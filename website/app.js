/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=4d022c7710eb666a1575127dca0bc0a0';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.querySelector('#generate').addEventListener('click', getData);

function getData(){
  let newZIP = document.querySelector('#zip').value;
  if(newZIP === ''){
    alert('Please, Enter a zipcode.');
    return;
  } else if (newZIP.length < 5 || newZIP.length > 5) {
    alert('Please, Enter a zipcode with a 5 digits.');
    return;
  }
  let newFeeling = document.querySelector('#feelings').value;
  getWeatherData(baseURL,newZIP,apiKey)
    .then(function(data) {
      if(data.cod === '404'){
        alert('Zipcode isn\'t correct.\nPlease, Enter a valid zipcode.');
        return;
      }
      postData('/add', {date: newDate, temp: data.main.temp, feeling: newFeeling})
      updateUI();
    })
}

const getWeatherData = async (url,zip,key)=>{
  const response = await fetch(url+zip+key)
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Failed with', error);
  }
}

const postData = async (url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log('Failed with', error);
  }
}

const updateUI = async ()=>{
  const response = await fetch('/all')
  try {
    const allData = await response.json();
    document.querySelector('#date').innerHTML = allData[0].date;
    document.querySelector('#temp').innerHTML = allData[0].temp;
    document.querySelector('#content').innerHTML = allData[0].feeling;
  } catch (error) {
    console.log('Failed with', error);
  }
}
