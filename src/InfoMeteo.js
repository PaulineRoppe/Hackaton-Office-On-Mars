import React from 'react';

export const InfoMeteo = (props) => {
  const {tabData, temps, wind}=props
  let x = Math.ceil(temps.length / 2);

  let list1 = [], list2 = [];

  for (let i = 0; i < temps.length; i++) {
    if (i > x) {
      list1.push(temps[i]);
    } else {
      list2.push(temps[i]);
    }
  }

  return (
    <div>
    <div className="ofx-s w-100 row">
      {list1.map((temp)=>
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
   
  </div>
  )
}