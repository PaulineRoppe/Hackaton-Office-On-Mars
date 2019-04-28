import React, { PropTypes,useState, setState, useEffect } from 'react';
import './App.css';
import { Planet } from './Planet';
import { InfoPlanet } from './InfoPlanet';
import { InfoMeteo } from './InfoMeteo';
import axios from 'axios'
import Speech from 'speak-tts'

export const App =  (props) => {
  const [tempMedium, setTempMedium] = useState();
  const [coord, setCoord] = useState({});
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [atmos, setAtmos] = useState();
  const [danger, setDanger] = useState(false);
  const [params, setParams] = useState();
  const [tabData, setData] = useState()
  const [temps, setTemps] = useState([])


  console.log('test')
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
        console.log(result.data)
        setTempMedium(result.data.temp)
        setCoord({'longitude' : result.data.longitude , 'latitude' : result.data.latitude})
        setData({ 'atmosphere' : result.data.atmosphere, 'rad' : result.data.radiation})
        setTemps(result.data.temperatures)
        setTempMedium(result.data.temperature)
        setDanger(result.data.alert)
    });
  }, []);

  return (
    <div className="App">
      <Planet coord={coord} />
      <InfoPlanet day={day} time={time} temp={tempMedium} coord={coord} />
      <InfoMeteo temps ={temps} tabData={tabData} />
    </div>
  );
}
