import React from 'react';

export const InfoMeteo = (props) => {
  const {tabData, temps}=props
  return (
    <div className="ofx-s w-100 row">
      {temps.map(temp=>(
        <div>
          Temperature : {temp} °C<br/> 
          Wind : {tabData.wind} <br/>
          Radiation : {tabData.rad}
          <hr/>
          
        </div>
      ))}
    </div>
  )
}