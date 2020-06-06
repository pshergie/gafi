import jsonConfig from './data.json';

document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container', {
        title: {
            text: 'Greed & Fear Index'
        },
        xAxis: {
            categories: [new Date()] // TODO: pull dates from database
        },
        yAxis: {
            title: {
                text: 'Index'
            }
        },
        series: [{
            name: 'Index',
            data: [61, 60, 59, 66] // TODO: pull values
        }]
    });
});