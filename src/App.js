import React, {useState, setState} from 'react';
import './App.css';
import {Planet} from './Planet';
import {InfoPlanet} from './InfoPlanet';
import {InfoMeteo} from './InfoMeteo';

import fusee from './fusee.png';

const App = () => {
  const [tempMedium , setTempMedium] = useState('25 °C');
  const [coord, setCoord] = useState(['Latitude : 50.6412', 'Longitude : 5.5718']);
  const [day, setDay] = useState('Vendredi 25 Avril 2025');
  const [time, setTime] = useState('15h15');
  const [atmos, setAtmos] = useState();
  const [danger, setDanger] = useState(false);
  const [params, setParams] = useState();
  const [tabData, setData] = useState([{'time' : '16H00', 'wind' : '750 hpa', 'temp' : '25°', 'rad' : '32 msv' }])

  return (
    <React.Fragment>
      <div className="fusee" >
        <img src={fusee} alt="fusée"/>
      </div>
        <div className="App">
          <Planet coord={coord} />
          <InfoPlanet day={day} time={time} temp={tempMedium} coord={coord} />
          <InfoMeteo tabData={tabData} />
        </div>
    </React.Fragment>
  );
}

export default App;
