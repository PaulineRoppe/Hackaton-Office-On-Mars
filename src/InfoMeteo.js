import React from 'react';

export const InfoMeteo = (props) => {
  const {tabData, temps}=props
  console.log(temps)
  return (
    <div className="ofy-s">
      {temps.map(temp=>(
        <div>
          Temperature : {temp}<br/> 
          Wind : {tabData.wind} <br/>
          Radiation : {tabData.rad}
          <hr/>
          
        </div>
      ))}
    </div>
  )
}