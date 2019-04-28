import React from 'react';

export const InfoPlanet = (props) => {
  return (
    <div>
     <div className="date">{props.day}</div>  <br/>
      {props.time}
      <hr/>
      Medium temperature : {props.temp}<br/>
      latitude : {props.coord.latitude} - longitude : {props.coord.longitude}
    </div>
  )
}