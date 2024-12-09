
function scrollToTopAndRefresh() {
    //Slightly scroll the screen to the top 
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh after scrolling is complete (slightly delayed)
    setTimeout(() => {
        location.reload();
    }, 500);
}

const API_KEY = '2770bf9f4ae275eb3a1da57d56b1ae0a';
const lat = 35.2429;
const lon = 129.0929;
const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;



// Chart.js initialization function (bar chart)
function createBarChart(canvasId, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // X-axis data (hours)
            datasets: [
                {
                    label: label,
                    data: [], // Y-axis data
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,

                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Create individual charts (bar charts)
const pm25Chart = createBarChart('pm25Chart', 'PM2.5');
const pm10Chart = createBarChart('pm10Chart', 'PM10');
const coChart = createBarChart('coChart', 'CO');
const no2Chart = createBarChart('no2Chart', 'NO2');
const so2Chart = createBarChart('so2Chart', 'SO2');
const nh3Chart = createBarChart('nh3Chart', 'NH3');

// Data import and specific chart update functions
async function fetchAndUpdateChart(chart, dataKey) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const components = data.list[0].components;
        const value = components[dataKey];
        const currentTime = new Date().toLocaleTimeString(); // Current time

        // Update Graphs
        chart.data.labels.push(currentTime);
        chart.data.datasets[0].data.push(value);
        chart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const thresholds = {
    pm2_5: { good: 10, moderate: 50, unhealthy: 75 },
    pm10: { good: 20, moderate: 100, unhealthy: 200 },
    no2: { good: 40, moderate: 150, unhealthy: 200 },
    nh3: { good: 200, moderate: 400, unhealthy: 800 },
    co: { good: 4400, moderate: 12400, unhealthy: 15400 },
    so2: { good: 20, moderate: 250, unhealthy: 350 }
};

// Status Evaluation Function
function evaluateStatus(value, thresholds) {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.moderate) return 'moderate';
    if (value <= thresholds.unhealthy) return 'unhealthy';
    return 'very-unhealthy';
}

// Image update function based on status
function updateImage(dataKey, value) {
    const imageElement = document.getElementById(`${dataKey}Image`);
    const status = evaluateStatus(value, thresholds[dataKey]);

    const imageMap = {
        good: "good.png",
        moderate: "soso.png",
        unhealthy: "bad.png",
        "very-unhealthy": "very bad.png"
    };

    imageElement.src = imageMap[status];
}

// Data import and status update function
async function fetchAndUpdateImage(dataKey) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const value = data.list[0].components[dataKey];
        updateImage(dataKey, value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Set each button click event
document.getElementById('pm25Button').addEventListener('click', () => fetchAndUpdateChart(pm25Chart, 'pm2_5'));
document.getElementById('pm10Button').addEventListener('click', () => fetchAndUpdateChart(pm10Chart, 'pm10'));
document.getElementById('coButton').addEventListener('click', () => fetchAndUpdateChart(coChart, 'co'));
document.getElementById('no2Button').addEventListener('click', () => fetchAndUpdateChart(no2Chart, 'no2'));
document.getElementById('so2Button').addEventListener('click', () => fetchAndUpdateChart(so2Chart, 'so2'));
document.getElementById('nh3Button').addEventListener('click', () => fetchAndUpdateChart(nh3Chart, 'nh3'));

document.getElementById('pm25Button').addEventListener('click', () => fetchAndUpdateImage('pm2_5'));
document.getElementById('pm10Button').addEventListener('click', () => fetchAndUpdateImage('pm10'));
document.getElementById('no2Button').addEventListener('click', () => fetchAndUpdateImage('no2'));
document.getElementById('nh3Button').addEventListener('click', () => fetchAndUpdateImage('nh3'));
document.getElementById('coButton').addEventListener('click', () => fetchAndUpdateImage('co'));
document.getElementById('so2Button').addEventListener('click', () => fetchAndUpdateImage('so2'));

const aqiMap = {
    1: {
        image: "nice.png",
        text: "The air quality is good today"
    },
    2: {
        image: "nice.png",
        text: "The air quality is fair today"
    },
    3: {
        image: "yellow.png",
        text: "The air quality is moderate"
    },
    4: {
        image: "red.png",
        text: "The air quality is poor"
    },
    5: {
        image: "red.png",
        text: "The air quality is very poor"
    }
};

// Update images and text according to AQI values
function updateAQI(aqiValue) {
    const lastDiv = document.getElementById('last');
    const image = lastDiv.querySelector('img');
    const text = lastDiv.querySelector('h3');

    if (aqiMap[aqiValue]) {
        image.src = aqiMap[aqiValue].image;
        text.textContent = aqiMap[aqiValue].text;
    } else {
        console.error("Invalid AQI value:", aqiValue);
    }
}

// Importing and updating data
async function fetchAndUpdateAQI() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch AQI data');
        }
        const data = await response.json();
        const aqiValue = data.list[0].main.aqi; // Get AQI value


        updateAQI(aqiValue);
    } catch (error) {
        console.error('Error fetching AQI data:', error);
    }
}

// Import AQI data at page loading
document.addEventListener('DOMContentLoaded', fetchAndUpdateAQI);

const API_KEY2 = '2770bf9f4ae275eb3a1da57d56b1ae0a';
const lat2 = 35.2429;
const lon2 = 129.0929;
const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=${API_KEY2}&units=metric`;

// Chart.js initialization function (bending line graph)
function createLineChart(canvasId, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // X-axis data (hours)
            datasets: [
                {
                    label: label,
                    data: [], // Y-axis data
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: label
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Create an individual chart (bending line graph)
const temperatureChart = createLineChart('temperatureChart', 'Temperature (°C)');
const humidityChart = createLineChart('humidityChart', 'Humidity (%)');

// Data import and specific chart update functions
async function fetchAndUpdateWeather(chart, dataKey, label) {
    try {
        const response = await fetch(url2);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const value = data.main[dataKey];
        const currentTime = new Date().toLocaleTimeString();

        chart.data.labels.push(currentTime);
        chart.data.datasets[0].data.push(value);
        chart.update();
    } catch (error) {
        console.error(`Error fetching ${label}:`, error);
    }
}

// Set each button click event
document.getElementById('temperatureButton').addEventListener('click', () => fetchAndUpdateWeather(temperatureChart, 'temp', 'Temperature (°C)'));
document.getElementById('humidityButton').addEventListener('click', () => fetchAndUpdateWeather(humidityChart, 'humidity', 'Humidity (%)'));

const ctx = document.getElementById('airQualityChart').getContext('2d');
const airQualityChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['PM2.5', 'PM10', 'NO2', 'NH3', 'CO', 'SO2'],
        datasets: [{
            label: 'Air Quality Components',
            data: [0, 0, 0, 0, 0, 0], // Initial Data Values
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw} µg/m³`;
                    }
                }
            }
        }
    }
});

// update
async function updateAirQualityChart() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const components = data.list[0].components;

        // update the data
        airQualityChart.data.datasets[0].data = [
            components.pm2_5,
            components.pm10,
            components.no2,
            components.nh3,
            components.co,
            components.so2
        ];

        // update the chart
        airQualityChart.update();
    } catch (error) {
        console.error('Error updating chart:', error);
    }
}

// click
document.getElementById('updateChartButton').addEventListener('click', updateAirQualityChart);

function toggleChart(chartId) {
    const chartWrapper = document.getElementById(chartId + '-wrapper');
    const currentDisplay = window.getComputedStyle(chartWrapper).display;

    if (currentDisplay === 'none') {
        chartWrapper.style.display = 'flex';
    } else {
        chartWrapper.style.display = 'none';
    }
}

document.getElementById('show-content').addEventListener('click', function () {
    const hiddenContent = document.getElementById('hidden-content');
    if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
        hiddenContent.style.display = 'block'; // Show the contents
        this.textContent = "닫기"; // Change link text
    } else {
        hiddenContent.style.display = 'none'; // Hide Content
        this.textContent = "README"; // Return to original text
    }
});


async function updateCardsWithData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const components = data.list[0].components;

        // 각 카드에 데이터 할당
        document.getElementById('c3').textContent = `PM2.5 : ${components.pm2_5} µg/m³`;
        document.getElementById('c4').textContent = `PM10 : ${components.pm10} µg/m³`;
        document.getElementById('c5').textContent = `NO2 : ${components.no2} µg/m³`;
        document.getElementById('c6').textContent = `NH3 : ${components.nh3} µg/m³`;
        document.getElementById('c7').textContent = `CO : ${components.co} µg/m³`;
        document.getElementById('c8').textContent = `SO2 : ${components.so2} µg/m³`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateCardsWithData);


async function updateTemperatureAndHumidity() {
    try {
        const response = await fetch(url2);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const weatherData = await response.json();

        // 온도와 습도 데이터를 카드에 업데이트
        document.getElementById('c1').textContent = `Temperature : ${weatherData.main.temp} °C`;
        document.getElementById('c2').textContent = `Humidity : ${weatherData.main.humidity} %`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// 이 함수를 페이지 로딩 시점에 호출하여 온도와 습도 정보를 자동으로 업데이트
document.addEventListener('DOMContentLoaded', () => {
    updateTemperatureAndHumidity();  // 온도와 습도 업데이트
    updateCardsWithData();           // 공기 오염 데이터 업데이트
});

const ctx4 = document.getElementById('vocChart').getContext('2d');
const vocChart = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: ['n-Valeraldehyde', 'iso-Valeraldehyde', 'Ammonia', 'Trimethylamine', 'Acetaldehyde'],
        datasets: [{
            label: 'VOC Levels',
            data: [0, 0, 0, 0, 0], // 초기 데이터 값
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)} ppb`; // 단위 변경 또는 필요에 맞게 조정
                    }
                }
            }
        }
    }
});

const date = new Date();
date.setHours(date.getHours() - 3); // Subtract three hours from the current time
const timeZoneOffset = date.getTimezoneOffset() * 60000; // convert offset to milliseconds
const localDate = new Date(date - timeZoneOffset);
const formattedHour = localDate.toISOString().slice(0, 13).replace(/[-:T]/g, ''); // Format to 'YYYYMMDDHH'

const url3 = `https://apis.data.go.kr/6260000/BadSmellandVOCs/getBadSmellInfo?serviceKey=C6yhUPVSxsRGta6TGsneKTtASeH9bhejrPmqK4o7o623rCyiUyy9aiACfcJh8tMTtATXL%2Br%2BIUOn9IaioG%2FZ1Q%3D%3D&pageNo=1&numOfRows=10&hourTime=${formattedHour}&resultType=json`;

async function updateVocChart() {

    try {
        const response = await fetch(url3);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log('API Data:', data);
        const items = data.response.body.items.item[0]; // Assume the first item in the array

        vocChart.data.datasets[0].data = [
            parseFloat(items.n_Valeraldehyde) || 0,
            parseFloat(items.iso_Valeraldehyde) || 0,
            parseFloat(items.ammonia) || 0,
            parseFloat(items.trimethylamine) || 0,
            parseFloat(items.acetaldehyde) || 0
        ];
        console.log('Updated Chart Data:', vocChart.data.datasets[0].data);

        vocChart.update();
    } catch (error) {
        console.error('Error updating chart:', error);
    }
}

// Ensure the DOM is fully loaded before attaching the event listener
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('vocButton').addEventListener('click', updateVocChart);
});


const API_KEY5 = '2770bf9f4ae275eb3a1da57d56b1ae0a';
const LAT = 35.2271;  // 부산 장전동의 위도
const LON = 129.0890; // 부산 장전동의 경도
const url5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;

// Data arrays
let temperatures = [];
let humidities = [];
let timeLabels = [];
let tempChart;
let humChart;
// Fetch data from API and update charts
function fetchDataAndUpdateCharts() {
    console.log(url5);
    fetch(url5)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.list || data.list.length === 0) {
                throw new Error('No data returned');
            }
            // 최근 8개 데이터만 추출
            const sliceIndex = Math.max(data.list.length - 9, 0);
            temperatures = data.list.slice(sliceIndex).map(entry => entry.main.temp - 273.15); // 켈빈을 섭씨로 변환
            humidities = data.list.slice(sliceIndex).map(entry => entry.main.humidity);
            timeLabels = data.list.slice(sliceIndex).map(entry => new Date(entry.dt * 1000).toLocaleTimeString());

            updateCharts();
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Initialize or update charts
function updateCharts() {
    const tempCtx = document.getElementById('hourtempChart').getContext('2d');
    const humCtx = document.getElementById('hourhumChart').getContext('2d');
    // Temperature chart initialization or update
    if (tempChart) {
        tempChart.data.labels = timeLabels;
        tempChart.data.datasets[0].data = temperatures;
        tempChart.update();
    } else {
        tempChart = new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }]
            }
        });
    }

    // Humidity chart initialization or update
    if (humChart) {
        humChart.data.labels = timeLabels;
        humChart.data.datasets[0].data = humidities;
        humChart.update();
    } else {
        humChart = new Chart(humCtx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'Humidity (%)',
                    data: humidities,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                }]
            }
        });
    }
}

// Initial call to populate the charts
fetchDataAndUpdateCharts();