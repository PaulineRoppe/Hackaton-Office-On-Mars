
exports.speechToTextGoogle = function (arrayBase64, key, languageCode, callback) {
    const url = 'https://speech.googleapis.com/v1/speech:recognize?key=' + key;
    const body = {
      config : {
        audioChannelCount: 2,
        languageCode
      },
      audio : {
        content: arrayBase64
      }
      };
    
    let request = require('request');
    request.post(url, body, callback);
};