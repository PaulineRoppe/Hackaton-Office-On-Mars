import React from 'react';

export const InfoPlanet = (props) => {
  return (
    <div>
     <div className="date">{props.day}</div>  <br/>
      {props.time}
      <hr/>
      Medium temperature : {Math.floor(props.temp)}<br/>
      latitude : {Math.floor(props.coord.latitude)} - longitude : {Math.floor(props.coord.longitude)}
    </div>
  )
}