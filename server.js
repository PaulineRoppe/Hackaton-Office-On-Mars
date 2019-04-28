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

app.get('/api/datas', function(req, res) {
    let data = generateDatas();
    res.send(JSON.stringify(data));
});

app.post('/speech', function (req, res) {
	let speech = require('speech');

	speech.speechToTextGoogle(req.body.record, 'AIzaSyB_e0Q1C3vgQ8OccASTkMlM3vogFXTGfuY', 'fr', function (err, data, body) {
		console.log(err);
		console.log(data);
		console.log(body);
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
		"azote": "10%",
		"carbon": "50%"
	};

	let alerts = meteo === "sandstorm" || meteo === "freezing";
	let temps = [];
	let min = meteo === "sandstorm" ? -30 : meteo === "freezing" ? -125 : 0;
	let max = meteo === "sandstorm" ? 10 : meteo === "freezing" ? -50 : 20;

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
		"atmosphere": atmosphere,
		"temperatures": temps,
		"temperature": currentTemp,
		"alert": alerts
	}

	oldData = datas;
	time = new Date();

	return datas;
}