const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false,limit: '50mb'}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + 'build/index.html'));
});

app.get('/api/datas', function(req, res) {
    let data = generateDatas();
    res.send(JSON.stringify(data));
});

app.post('/speech', function (req, res) {
	const speech = require('@google-cloud/speech');
	const client = new speech.SpeechClient();

	const audio = {
		content: req.body.record,
	};
	const config = {
		encoding: 'LINEAR16',
		sampleRateHertz: 128000,
		languageCode: 'fr',
	};

	const request = {
		audio: audio,
		config: config,
	};

	client
	.recognize(request)
	.then(data => {
		const response = data[0];
		const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
		console.log(`Transcription: ${transcription}`);
	})
	.catch(err => {
		console.error('ERROR:', err);
	});
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
		if (new Date().getTime() - time.getTime() < 5000) {
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
		"N" : "3%",
		"CO2" : "96 %",
		"Ag" :"1,93 %"
	};

	let alerts = meteo === "sandstorm" || meteo === "freezing";
	let temps = [];
	let min = meteo === "sandstorm" ? -30 : meteo === "freezing" ? -125 : 0;
	let max = meteo === "sandstorm" ? 10 : meteo === "freezing" ? -50 : 20;
	let minWind = meteo === "sandstorm" ? 100 : meteo === "freezing" ? 60: 70;
	let maxWind = meteo === "sandstorm" ? 150 : meteo === "freezing" ? 100: 120;
	
	let wind = Math.random() * (maxWind - minWind) + minWind;

	if (oldData == null) {
		let old = -1;

		for (let j = 0; j <= 23; j++) {
			let ran = randomInterval(old == -1 ? min : old + randomInterval(-2, 0), old == -1 ? max : old + randomInterval(0, 2));
			temps.push(ran);
			old = ran;
		}
	} else {
		temps = oldData.temperatures;
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
		"wind": wind,
		"atmosphere": atmosphere,
		"temperatures": temps,
		"temperature": currentTemp,
		"alert": alerts
	}

	oldData = datas;
	time = new Date();

	return datas;
}