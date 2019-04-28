
exports.speechToTextGoogle = function (arrayBuffer, key, languageCode, callback) {
    const url = 'https://speech.googlapis.com/v1/speech:recognize?key=' + key;
    const audio = arrayBufferToBase64(arrayBuffer);
    const body = {
      config : {
        audioChannelCount: 2,
        languageCode
      },
      audio : {
        content: audio
      }
      };
    
    let request = require('request');

    request.post(url, body, callback);
};
 
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}