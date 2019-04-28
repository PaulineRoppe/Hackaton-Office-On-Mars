import React from 'react';

export const InfoPlanet = (props) => {
  return (
    <div>
     <div className="date">{props.day}</div>  <br/>
      {props.time}
      <hr/>
      Medium temperature : {props.temp}<br/>
      {props.coord[0]} - {props.coord[1]}
    </div>
  )
}