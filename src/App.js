import React, { PropTypes,useState, setState, useEffect } from 'react';
import { Planet } from './Planet';
import { InfoPlanet } from './InfoPlanet';
import { InfoMeteo } from './InfoMeteo';
import axios from 'axios'
import Speech from 'speak-tts'


function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
};

function formatHour(hour) {

  var hours = hour.getHours();
  var minutes = hour.getMinutes() || "00";

  return hours+ ' H ' + minutes;
};

const speech = new Speech()
speech.init()

export const App =  (props) => {
  const [tempMedium, setTempMedium] = useState();
  const [coord, setCoord] = useState({});
  const [day, setDay] = useState(formatDate(new Date()));
  const [time, setTime] = useState(formatHour(new Date()));
  const [atmos, setAtmos] = useState();
  const [danger, setDanger] = useState(false);
  const [params, setParams] = useState();
  const [tabData, setData] = useState()
  const [temps, setTemps] = useState([])
  const [record, setRecord] = useState(false)

  // fetch('api/datas').then(function(response) {
  //   return response.json();
  // }).then(function (json) {
  //   console.log(json.longitude);
  //   setCoord({'latitude' : json.latitude, 'longitude' : json.longitude})
  // })

  useEffect(() => {
    axios
      .get('api/datas')
      .then(result => {  
        setTempMedium(result.data.temp)
        setCoord({'longitude' : result.data.longitude , 'latitude' : result.data.latitude})
        setData({ 'atmosphere' : result.data.atmosphere, 'rad' : result.data.radiation})
        setTemps(result.data.temperatures)
        setTempMedium(result.data.temperature)
        setDanger(result.data.alert)
        setAtmos(result.data.wind)
    });
  }, []);

  function startRecording () {
    setRecord(true)
  }
 
  function stopRecording () {
    setRecord(false)
  }
 
  function onData(recordedBlob) {
  }
 
  function onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    // axios({
    //   url:'/speech',
    //   method:'post',
    //   data: {record: recordedBlob.blob}
    // })
    let response = "meteo"
    switch (true) {
      case /\bmeteo\b/i.test(response) : 
        speech.speak({
          text: "Aujourd'hui le thermomètre affichera -29 degré celsius" ,
        })
        break
      default : 
        speech.speak({
          text: 'Hello, how are you today ?',
        })
        break
    }
  }

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

  return (
    <div className="App">
      <Planet coord={coord} />
      <InfoPlanet day={day} time={time} temp={tempMedium} coord={coord} record={record} startRecording={startRecording} stopRecording={stopRecording} onData={onData} onStop={onStop}  />
      <InfoMeteo temps ={temps} tabData={tabData} wind={atmos} />
      
    </div>
  );
}
