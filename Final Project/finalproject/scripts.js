
function scrollToTopAndRefresh() {
    // 화면을 최상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 스크롤이 완료된 후 새로고침 (약간의 지연을 줍니다)
    setTimeout(() => {
        location.reload();
    }, 500); // 0.5초 후 새로고침
}

const API_KEY = '2770bf9f4ae275eb3a1da57d56b1ae0a';
const lat = 35.2429; // 부산 금정구 위도
const lon = 129.0929; // 부산 금정구 경도
const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

// Chart.js 초기화 함수 (막대 차트)
function createBarChart(canvasId, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // X축 데이터 (시간)
            datasets: [
                {
                    label: label,
                    data: [], // Y축 데이터
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

// 개별 차트 생성 (막대 차트)
const pm25Chart = createBarChart('pm25Chart', 'PM2.5');
const pm10Chart = createBarChart('pm10Chart', 'PM10');
const coChart = createBarChart('coChart', 'CO');
const no2Chart = createBarChart('no2Chart', 'NO2');
const so2Chart = createBarChart('so2Chart', 'SO2');
const nh3Chart = createBarChart('nh3Chart', 'NH3');

// 데이터 가져오기 및 특정 차트 업데이트 함수
async function fetchAndUpdateChart(chart, dataKey) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const components = data.list[0].components;
        const value = components[dataKey];
        const currentTime = new Date().toLocaleTimeString(); // 현재 시각

        // 그래프 업데이트
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

// 상태 평가 함수
function evaluateStatus(value, thresholds) {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.moderate) return 'moderate';
    if (value <= thresholds.unhealthy) return 'unhealthy';
    return 'very-unhealthy';
}

// 상태에 따른 이미지 업데이트 함수
function updateImage(dataKey, value) {
    const imageElement = document.getElementById(`${dataKey}Image`);
    const status = evaluateStatus(value, thresholds[dataKey]);

    const imageMap = {
        good: "/공기 일러스트/good.png",
        moderate: "/공기 일러스트/soso.png",
        unhealthy: "/공기 일러스트/bad.png",
        "very-unhealthy": "/공기 일러스트/very bad.png"
    };

    imageElement.src = imageMap[status];
}

// 데이터 가져오기 및 상태 업데이트 함수
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

// 버튼 클릭 이벤트 각각 설정
document.getElementById('pm25Button').addEventListener('click', () => fetchAndUpdateChart(pm25Chart, 'pm2_5'));
document.getElementById('pm10Button').addEventListener('click', () => fetchAndUpdateChart(pm10Chart, 'pm10'));
document.getElementById('coButton').addEventListener('click', () => fetchAndUpdateChart(coChart, 'co'));
document.getElementById('no2Button').addEventListener('click', () => fetchAndUpdateChart(no2Chart, 'no2'));
document.getElementById('so2Button').addEventListener('click', () => fetchAndUpdateChart(so2Chart, 'so2'));
document.getElementById('nh3Button').addEventListener('click', () => fetchAndUpdateChart(nh3Chart, 'nh3'));

// 버튼 클릭 이벤트 설정
document.getElementById('pm25Button').addEventListener('click', () => fetchAndUpdateImage('pm2_5'));
document.getElementById('pm10Button').addEventListener('click', () => fetchAndUpdateImage('pm10'));
document.getElementById('no2Button').addEventListener('click', () => fetchAndUpdateImage('no2'));
document.getElementById('nh3Button').addEventListener('click', () => fetchAndUpdateImage('nh3'));
document.getElementById('coButton').addEventListener('click', () => fetchAndUpdateImage('co'));
document.getElementById('so2Button').addEventListener('click', () => fetchAndUpdateImage('so2'));

const aqiMap = {
    1: {
        image: "/공기 일러스트/nice.png",
        text: "The air quality is good today"
    },
    2: {
        image: "/공기 일러스트/nice.png",
        text: "The air quality is fair today"
    },
    3: {
        image: "/공기 일러스트/yellow.png",
        text: "The air quality is moderate"
    },
    4: {
        image: "/공기 일러스트/red.png",
        text: "The air quality is poor"
    },
    5: {
        image: "/공기 일러스트/red.png",
        text: "The air quality is very poor"
    }
};

// AQI 값에 따라 이미지와 텍스트 업데이트
function updateAQI(aqiValue) {
    const lastDiv = document.getElementById('last');
    const image = lastDiv.querySelector('img');
    const text = lastDiv.querySelector('p');

    if (aqiMap[aqiValue]) {
        image.src = aqiMap[aqiValue].image;
        text.textContent = aqiMap[aqiValue].text;
    } else {
        console.error("Invalid AQI value:", aqiValue);
    }
}

// 데이터 가져오기 및 업데이트
async function fetchAndUpdateAQI() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch AQI data');
        }
        const data = await response.json();
        const aqiValue = data.list[0].main.aqi; // AQI 값 가져오기

        // AQI 업데이트
        updateAQI(aqiValue);
    } catch (error) {
        console.error('Error fetching AQI data:', error);
    }
}

// 페이지 로드 시 AQI 데이터 가져오기
document.addEventListener('DOMContentLoaded', fetchAndUpdateAQI);

const API_KEY2 = '2770bf9f4ae275eb3a1da57d56b1ae0a';
const lat2 = 35.2429; // 부산 금정구 위도
const lon2 = 129.0929; // 부산 금정구 경도
const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=${API_KEY2}&units=metric`;

// Chart.js 초기화 함수 (꺾은선 그래프)
function createLineChart(canvasId, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // X축 데이터 (시간)
            datasets: [
                {
                    label: label,
                    data: [], // Y축 데이터
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

// 개별 차트 생성 (꺾은선 그래프)
const temperatureChart = createLineChart('temperatureChart', 'Temperature (°C)');
const humidityChart = createLineChart('humidityChart', 'Humidity (%)');

// 데이터 가져오기 및 특정 차트 업데이트 함수
async function fetchAndUpdateWeather(chart, dataKey, label) {
    try {
        const response = await fetch(url2);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const value = data.main[dataKey]; // 온도 또는 습도 값
        const currentTime = new Date().toLocaleTimeString(); // 현재 시각

        // 그래프 업데이트
        chart.data.labels.push(currentTime);
        chart.data.datasets[0].data.push(value);
        chart.update();
    } catch (error) {
        console.error(`Error fetching ${label}:`, error);
    }
}

// 버튼 클릭 이벤트 각각 설정
document.getElementById('temperatureButton').addEventListener('click', () => fetchAndUpdateWeather(temperatureChart, 'temp', 'Temperature (°C)'));
document.getElementById('humidityButton').addEventListener('click', () => fetchAndUpdateWeather(humidityChart, 'humidity', 'Humidity (%)'));

const ctx = document.getElementById('airQualityChart').getContext('2d');
const airQualityChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['PM2.5', 'PM10', 'NO2', 'NH3', 'CO', 'SO2'],
        datasets: [{
            label: 'Air Quality Components',
            data: [0, 0, 0, 0, 0, 0], // 초기 데이터 값
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

// 데이터 업데이트 함수
async function updateAirQualityChart() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const components = data.list[0].components;

        // 데이터를 업데이트
        airQualityChart.data.datasets[0].data = [
            components.pm2_5,
            components.pm10,
            components.no2,
            components.nh3,
            components.co,
            components.so2
        ];

        // 차트 업데이트
        airQualityChart.update();
    } catch (error) {
        console.error('Error updating chart:', error);
    }
}

// 버튼 클릭 이벤트
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

