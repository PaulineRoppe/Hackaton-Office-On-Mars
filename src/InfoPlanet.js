import React from 'react';
import { ReactMic } from 'react-mic';

export const InfoPlanet = (props) => {
  const {startRecording, stopRecording, onData, onStop, record} = props
  return (
    <div className="m-20 w-20v">
     <div className="date">{props.day}</div>  <br/>
      {props.time}
      <hr/>
      Medium temperature : {Math.floor(props.temp)}<br/>
      latitude : {Math.floor(props.coord.latitude)} - longitude : {Math.floor(props.coord.longitude)}

      <ReactMic
        record={record}         // defaults -> false.  Set to true to begin recording
        className="dn"
        onStop={onStop}
        onData={onData}       // callback to execute when chunk of audio data is available
      />
      <button onClick={startRecording} type="button">Start</button>
      <button onClick={stopRecording} type="button">Stop</button>
    </div>
  )
}