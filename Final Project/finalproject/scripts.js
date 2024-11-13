
function scrollToTopAndRefresh() {
    // 화면을 최상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 스크롤이 완료된 후 새로고침 (약간의 지연을 줍니다)
    setTimeout(() => {
        location.reload();
    }, 500); // 0.5초 후 새로고침
}
// Line Chart for Temperature & Humidity
const ctxLine = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [20, 25, 30, 22, 28, 35],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
            {
                label: 'Humidity (%)',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});

// Bar Chart for Pollutants
const ctxBar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['PM2.5', 'PM10', 'NOx', 'NH3', 'CO2', 'SO2', 'VOC'],
        datasets: [{
            label: 'Concentration (µg/m³)',
            data: [30, 20, 15, 10, 50, 5, 25],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});

// Doughnut Chart for Pollutant Distribution
const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
const doughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: ['PM2.5', 'PM10', 'NOx', 'NH3', 'CO2', 'SO2', 'VOC'],
        datasets: [{
            data: [20, 15, 25, 10, 10, 10, 10],
            backgroundColor: [
                '#ff6384',
                '#36a2eb',
                '#ffce56',
                '#4bc0c0',
                '#9966ff',
                '#ff9f40',
                '#ffcd56'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});
