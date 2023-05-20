function updateSensorValue(endpoint, id) {
$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data) {
    var value = document.getElementById(id);
    value.innerHTML = data.value;
    },
    error: function(error_data) {
    console.log(error_data);
    }
});
}

function updateActuatorState(endpoint, id) {
$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data) {
    var state = document.getElementById(id);
    state.innerHTML = data.state;
    },
    error: function(error_data) {
    console.log(error_data);
    }
});
}


var gradientChartOptionsConfiguration = {
maintainAspectRatio: false,
legend: {
    display: false
},
tooltips: {
    backgroundColor: '#333',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
},
responsive: true,
scales: {
    yAxes: [{
    barPercentage: 1,
    gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
    },
    ticks: {
        suggestedMin: 0,
        suggestedMax: 5,
        padding: 20,
        fontColor: "#9a9a9a"
    }
    }],
    xAxes: [{
    gridLines: {
        drawBorder: false,
        color: 'rgba(220,53,69,0.1)',
        zeroLineColor: "transparent",
    },
    ticks: {
        padding: 20,
        fontColor: "#9a9a9a"
    }
    }]
}
};

//==Sensor==//

//==Soil Moisture Sensor Chart==//
var ctxsms = document.getElementById("SoilMoistureSensorChart").getContext("2d");
var gradientStrokeGreen = ctxsms.createLinearGradient(0, 230, 0, 50);
gradientStrokeGreen.addColorStop(1, 'rgba(6, 214, 160, 0.2)'); // Green colors
gradientStrokeGreen.addColorStop(0.2, 'rgba(6, 214, 160, 0.0)');
gradientStrokeGreen.addColorStop(0, 'rgba(6, 214, 160, 0)');

var soilMoistureChart = new Chart(ctxsms, {
type: 'line',
data: {
    labels: [],
    datasets: [{
    label: "Soil Moisture",
    data: [],
    fill: true,
    backgroundColor: gradientStrokeGreen, // Green color
    borderColor: '#39cc74', // Green color
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#39cc74', // Green color
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#39cc74', // Green color
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4
    }]
},
options: gradientChartOptionsConfiguration
});


function updateSoilMoistureChart(endpoint) {
$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data) {
    soilMoistureChart.data.labels.push(new Date().toLocaleTimeString());
    soilMoistureChart.data.datasets[0].data.push(data.value);

    if (soilMoistureChart.data.labels.length > 5) {
        soilMoistureChart.data.labels.shift();
        soilMoistureChart.data.datasets[0].data.shift();
    }

    soilMoistureChart.update();
    },
    error: function(error_data) {
    console.log(error_data);
    }
});
}

//==Air Temperature Sensor Chart==//
var ctxats = document.getElementById("AirTemperatureSensorChart").getContext("2d");
var gradientStrokeBlue = ctxats.createLinearGradient(0, 230, 0, 50);
gradientStrokeBlue.addColorStop(1, 'rgba(41, 128, 185, 0.2)'); // Blue colors
gradientStrokeBlue.addColorStop(0.2, 'rgba(41, 128, 185, 0.0)');
gradientStrokeBlue.addColorStop(0, 'rgba(41, 128, 185, 0)');
var airTemperatureChart = new Chart(ctxats, {
type: 'line',
data: {
    labels: [],
    datasets: [{
    label: "Air Temperature",
    data: [],
    fill: true,
    backgroundColor: gradientStrokeBlue, // Blue color
    borderColor: '#369ef0', // Blue color
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#369ef0', // Blue color
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#369ef0', // Blue color
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4
    }]
},
options: gradientChartOptionsConfiguration
});

function updateAirTemperatureChart(endpoint) {
$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data) {
    airTemperatureChart.data.labels.push(new Date().toLocaleTimeString());
    airTemperatureChart.data.datasets[0].data.push(data.value);

    if (airTemperatureChart.data.labels.length > 5) {
        airTemperatureChart.data.labels.shift();
        airTemperatureChart.data.datasets[0].data.shift();
    }

    airTemperatureChart.update();
    },
    error: function(error_data) {
    console.log(error_data);
    }
});
}

//==Light Intensity Sensor Chart==//
var ctxlis = document.getElementById("LightIntensitySensorChart").getContext("2d");
var gradientStrokeYellow = ctxlis.createLinearGradient(0, 230, 0, 50);
gradientStrokeYellow.addColorStop(1, 'rgba(241, 196, 15, 0.2)'); // Yellow colors
gradientStrokeYellow.addColorStop(0.2, 'rgba(241, 196, 15, 0.0)');
gradientStrokeYellow.addColorStop(0, 'rgba(241, 196, 15, 0)');
var lightIntensityChart = new Chart(ctxlis, {
type: 'line',
data: {
    labels: [],
    datasets: [{
    label: "Light Intensity",
    data: [],
    fill: true,
    backgroundColor: gradientStrokeYellow, // Yellow color
    borderColor: '#ffce56', // Yellow color
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#ffce56', // Yellow color
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#ffce56', // Yellow color
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4
    }]
},
options: gradientChartOptionsConfiguration
});

function updateLightIntensityChart(endpoint) {
$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data) {
    lightIntensityChart.data.labels.push(new Date().toLocaleTimeString());
    lightIntensityChart.data.datasets[0].data.push(data.value);

    if (lightIntensityChart.data.labels.length > 5) {
        lightIntensityChart.data.labels.shift();
        lightIntensityChart.data.datasets[0].data.shift();
    }

    lightIntensityChart.update();
    },
    error: function(error_data) {
    console.log(error_data);
    }
});
}


//==Actuator==//
var ctxaic = document.getElementById("AutomaticIrrigationChart").getContext("2d");
var gradientStrokePurple = ctxaic.createLinearGradient(0, 230, 0, 50);
gradientStrokePurple.addColorStop(1, 'rgba(155, 89, 182, 0.2)'); // Purple colors
gradientStrokePurple.addColorStop(0.2, 'rgba(155, 89, 182, 0.0)');
gradientStrokePurple.addColorStop(0, 'rgba(155, 89, 182, 0)');
var automaticIrrigationChart = new Chart(ctxaic, {
type: 'line',
data: {
    labels: [],
    datasets: [{
    label: "Automatic Irrigation",
    data: [],
    fill: true,
    backgroundColor: gradientStrokePurple, // Purple color
    borderColor: '#9b59b6', // Purple color
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#9b59b6', // Purple color
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#9b59b6', // Purple color
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4
    }]
},
options: gradientChartOptionsConfiguration
});

function updateAutomaticIrrigationChart(endpoint) {
$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data) {
    automaticIrrigationChart.data.labels.push(new Date().toLocaleTimeString());
    automaticIrrigationChart.data.datasets[0].data.push(data.state);

    if (automaticIrrigationChart.data.labels.length > 5) {
        automaticIrrigationChart.data.labels.shift();
        automaticIrrigationChart.data.datasets[0].data.shift();
    }

    automaticIrrigationChart.update();
    },
    error: function(error_data) {
    console.log(error_data);
    }
});
}

function getLatestSensorLogs() {
$.ajax({
    method: "GET",
    url: "/sensorlog/latest",  // Ubah URL sesuai dengan endpoint Django Anda
    success: function(data) {
    var tableBody = document.getElementById("sensorLogTableBody");
    tableBody.innerHTML = ""; // Menghapus isi tabel sebelumnya

    // Iterasi melalui data sensor log dan menambahkannya ke tabel
    data.forEach(function(log) {
        var row = document.createElement("tr");

        var timestampCell = document.createElement("td");
        timestampCell.textContent = log.timestamp;
        row.appendChild(timestampCell);

        var sensorTypeCell = document.createElement("td");
        sensorTypeCell.textContent = log.sensor_name;
        row.appendChild(sensorTypeCell);

        var valueCell = document.createElement("td");
        valueCell.textContent = log.value;
        row.appendChild(valueCell);

        tableBody.appendChild(row);
    });
    },
    error: function(error_data) {
    console.log(error_data);
    }
});
}

setInterval(function() {
updateSensorValue('/smartfarm/soilmoisture', 'SoilMoistureSensor');
updateSoilMoistureChart('/smartfarm/soilmoisture');

updateSensorValue('/smartfarm/airtemperature', 'AirTemperatureSensor');
updateAirTemperatureChart('/smartfarm/airtemperature');

updateSensorValue('/smartfarm/lightintensity', 'LightIntensitySensor');
updateLightIntensityChart('/smartfarm/lightintensity');

updateActuatorState('/actuator/automaticirrigation', 'AutomaticIrrigationState');
updateAutomaticIrrigationChart('/actuator/automaticirrigation');

getLatestSensorLogs();
}, 1000);