$(function () {
    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        timeline: {
            enabled: true,
            axisLabel: 'year',
            begin: 2000,
            end: 2010,
            // TODO add interval
            series: [0, 1], // The series which holds points to update
            updateInterval: 20,
            magnet: {
                type: 'both', // thumb / point / both
                round: 'floor', // ceil / floor / round
                smoothThumb: true, // defaults to true
                step: 0.01
            }
        },
        series: [{
            name: 'Jane',
            data: [
                {
                    data: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    data: [5, 5, 7, 7, 3, 8, 9, 9, 1, 7, 3]
                }, {
                    data: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }

            ]
        }, {
            name: 'John',
            data: [
                {
                    data: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }, {
                    data: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    data: [9, 1, 7, 3, 3, 2, 1, 4, 5, 6, 7]
                }
            ]
        }]
    });
});