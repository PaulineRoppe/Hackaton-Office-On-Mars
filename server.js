const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + 'build/index.html'));
});

app.get('/api/datas', function (req, res, next) {
	let data = generateDatas();
	res.json(data);
});

app.listen(port, () => {
	console.log("Server running on port " + port);
});

let oldData = null;
let time = null;

function randomInterval(min, max) {
	return Math.random() * (max - min) + min;
}

function generateDatas() {
	if (oldData != null) {
		if (new Date().getTime() - time >= 5000) {
			return oldData;
		}
	}

	let i = Math.floor(Math.random() * (3));
	let meteos = ["sunny", "sandstorm", "freezing"];
	let meteo = meteos[i];

	let rads = oldData == null ? randomInterval(1, 50) : randomInterval(oldData.radiation - 2, oldData.radiation + 2);
	let longitude = oldData == null ? randomInterval(-180, 180) : oldData.longitude;
	let latitude = oldData == null ? randomInterval(-90, 90) : oldData.latitude;

	let atmosphere = {
		"azote": "10%",
		"carbon": "50%"
	};

	let alerts = meteo === "sandstorm" || meteo === "freezing";
	let temps = [];
	let min = meteo === "sandstorm" ? -30 : meteo === "freezing" ? -125 : 0;
	let max = meteo === "sandstorm" ? 10 : meteo === "freezing" ? -50 : 20;

	if (oldData == null) {
		for (let j = 0; j <= 23; j++) {
			let old = j == 0 ? -1 : temps[j];

			temps.push(randomInterval(old == -1 ? min : old + randomInterval(-2, 0), old == -1 ? max : old + randomInterval(0, 2)));
		}
	} else {
		temps = oldData.temperature;
	}

	let actualHour = new Date().getHours();
	let actualMin = new Date().getMinutes();

	let temp1 = temps[actualHour], temp2 = temps[actualHour + 1];
	let currentTemp = require('lerp')(temp1, temp2, actualMin / 60);

	let datas = {
		"meteo": meteo,
		"radiation": rads,
		"longitude": longitude,
		"latitude": latitude,
		"atmosphere": atmosphere,
		"temperatures": temps,
		"temperature": currentTemp,
		"alert": alerts
	}
	return datas;
}

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-GB';

const request = {
	config: {
		encoding: encoding,
		sampleRateHertz: sampleRateHertz,
		languageCode: languageCode,
	},
	interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
	.streamingRecognize(request)
	.on('error', console.error)
	.on('data', data =>
		process.stdout.write(
			data.results[0] && data.results[0].alternatives[0] ?
			`Transcription: ${data.results[0].alternatives[0].transcript}\n` :
			`\n\nReached transcription time limit, press Ctrl+C\n`
		)
	);

// Start recording and send the microphone input to the Speech API
record
	.start({
		sampleRateHertz: sampleRateHertz,
		threshold: 0,
		// Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
		verbose: false,
		recordProgram: 'rec', // Try also "arecord" or "sox"
		silence: '10.0',
	})
	.on('error', console.error)
	.pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');