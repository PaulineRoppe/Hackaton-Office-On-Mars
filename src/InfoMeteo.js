import React from 'react';

export const InfoMeteo = (props) => {
  const {tabData, temps, wind}=props
  console.log(temps)
  return (
    <div className="ofx-s w-100 row">
      {temps.map((temp)=>
        (
        <div className="w-250px p-20">
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