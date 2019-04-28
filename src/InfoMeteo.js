import React from 'react';

export const InfoMeteo = (props) => {
  const {tabData, temps, wind}=props
  console.log(temps)
  let hour = 0
  return (
    <div className="ofx-s w-100 row">
      {temps.map((temp)=>
        hour++ &&
        (
        <div>
          Temperature : {Math.floor(temp)} °C<br/> 
          Wind : {Math.floor(wind)} <br/>
          Radiation : {Math.floor(tabData.rad)}
          <hr/>
          {temps.indexOf(temp)} h 00
        </div>
      ) 
      )}
    </div>
  )
}