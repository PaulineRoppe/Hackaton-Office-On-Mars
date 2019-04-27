var express = require("express");
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'build/index.html'));
});

app.get('/api/datas', function(req, res, next) {
    let data = generateDatas();
    res.send(JSON.stringify(data));
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});

function generateDatas(){
    let i = Math.floor(Math.random() * (3) );
    let meteos = ["sunny", "sandstorm", "freezing"];
    let meteo = meteos[i];
    let rads = Math.random() * (50 - 1) + 1;
    let longitude = Math.random() * (180 + 180) - 180;
    let latitude = Math.random() * (90 + 90) - 90;
    let atmosphere = {"azote":"10%", "carbon":"50%"};
    let alerts, temp = [];

    if(meteo === "sandstorm"){
        for(let j = 0; j <= 23; j++){
            temp.push(Math.random() * (25 + 30) - 30);
        }
        alerts = true;
    }
    else if(meteo === "freezing"){
        for(let j = 0; j <= 23; j++){
            temp.push(Math.random() * (-50 + 125) - 125);
        }
        alerts = true;
    }
    else{
        for(let j = 0; j<= 23; j++){
            temp.push(Math.random() * (20));
        }
        alerts = false;
    }

    let datas = {
        "meteo": meteo,
        "radiation": rads,
        "longitude": longitude,
        "latitude": latitude,
        "atmosphere": atmosphere,
        "temperature": temp,
        "alert": alerts
    }
    return datas;
}