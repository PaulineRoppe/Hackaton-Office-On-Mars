import React from 'react';
import { ReactMic } from 'react-mic';

export const InfoPlanet = (props) => {
  const {startRecording, stopRecording, onData, onStop, record} = props
  return (
    <div className="m-20 w-20v">
      <div className="truc">
        <div className="date">{props.day}</div> <br />
        <div className="date">{props.time}</div>
        <ReactMic
          record={record} // defaults -> false.  Set to true to begin recording
          className="dn"
          onStop={onStop}
          onData={onData} // callback to execute when chunk of audio data is available
        />
        <hr />
        Medium temperature : {Math.floor(props.temp)}
        <br />
        latitude : {Math.floor(props.coord.latitude)} - longitude :{" "}
        {Math.floor(props.coord.longitude)}
        <div className="buttonfield">
        <button onClick={startRecording} type="button" className="button">
          Start
        </button>
        <button onClick={stopRecording} type="button" className="button" >
          Stop
        </button>
        </div>
      </div>
    </div>
  );
}