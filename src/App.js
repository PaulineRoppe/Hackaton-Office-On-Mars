import React, { PropTypes,useState, setState, useEffect } from 'react';
import './App.css';
import { Planet } from './Planet';
import { InfoPlanet } from './InfoPlanet';
import { InfoMeteo } from './InfoMeteo';
import axios from 'axios'
import Speech from 'speak-tts'
import { ReactMic } from 'react-mic';

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
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  function onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    axios({
      url:'/speech',
      method:'post',
      data: {record: recordedBlob.blob}
    })
  }

  return (
    <div className="App">
      <Planet coord={coord} />
      <InfoPlanet day={day} time={time} temp={tempMedium} coord={coord} />
      <InfoMeteo temps ={temps} tabData={tabData} wind={atmos} />
      <ReactMic
        record={record}         // defaults -> false.  Set to true to begin recording
        
        onStop={onStop}
        onData={onData}       // callback to execute when chunk of audio data is available
      />
      <button onClick={startRecording} type="button">Start</button>
      <button onClick={stopRecording} type="button">Stop</button>
    </div>
  );
}
