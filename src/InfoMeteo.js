import React from 'react';

export const InfoMeteo = (props) => {
  return (
    <div>
      {props.tabData.map(data=>(
        <div>
          Temperature : {data.temp}<br/> 
          Wind : {data.wind} <br/>
          Radiation : {data.rad}
          <hr/>
          {data.time}
        </div>
      ))}
    </div>
  )
}