import React, { PropTypes,useState, setState } from 'react';
import './App.css';
import { Planet } from './Planet';
import { InfoPlanet } from './InfoPlanet';
import { InfoMeteo } from './InfoMeteo';
// import useAxios from 'axios-hooks';
import axios from 'axios'
import Speech from 'speak-tts'

const App =  async (props) => {
  let response
  
  response = await fetch('api/datas')
  // const [ response, loading, error , refetch] = useAxios({
  //   method: 'GET',
  //   url:'api/datas'
  // })
  // 'latitude' : data.latitude, 'longitude' : data.longitude
  console.log(response.data.longitude)
  const [tempMedium, setTempMedium] = useState('25 °C');
  const [coord, setCoord] = useState({});
  const [day, setDay] = useState('Vendredi 25 Avril 2025');
  const [time, setTime] = useState('15h15');
  const [atmos, setAtmos] = useState();
  const [danger, setDanger] = useState(false);
  const [params, setParams] = useState();
  const [tabData, setData] = useState([{ 'time': '16H00', 'wind': '750 hpa', 'temp': '25°', 'rad': '32 msv' }])
  
  
  

  return (
    <div className="App">
      <Planet coord={coord} />
      <InfoPlanet day={day} time={time} temp={tempMedium} coord={coord} />
      <InfoMeteo tabData={tabData} />
    </div>
  );
}


export default App;
