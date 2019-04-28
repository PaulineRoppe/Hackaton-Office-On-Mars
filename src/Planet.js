import React from 'react'
import satellite1 from './satellite1.png'


export const Planet =(props) =>{
  return(
    <div className="img-planete">
      <img src='http://www.stickpng.com/assets/images/580b585b2edbce24c47b2708.png' />
      <div className="satellite">
        <img src={satellite1} alt="satellite"/>
      </div>
    </div>
  )
}