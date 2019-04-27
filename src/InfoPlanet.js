import React from 'react';

export const InfoPlanet = (props) => {
  return (
    <div>
      {props.day} <br/>
      {props.time}
      <hr/>
      Medium temperature : {props.temp}<br/>
      latitude : {props.coord.latitude} - longitude : {props.coord.longitude}
    </div>
  )
}