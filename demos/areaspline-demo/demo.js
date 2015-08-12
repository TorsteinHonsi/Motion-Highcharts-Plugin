$(function () {
    $('#container').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Fruit consumption during some weeks'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Fruit units'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        timeline: {
            enabled: true,
            axisLabel: 'year',
            begin: 2000,
            end: 2010,
            series: [0, 1], // The series which holds points to update
            updateInterval: 15,
            magnet: {
                round: 'floor', // ceil / floor / round
                step: 0.02
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
                }, {
                    data: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    data: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
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
                }, {
                    data: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }, {
                    data: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    data: [9, 1, 7, 3, 3, 2, 1, 4, 5, 6, 7]
                }, {
                    data: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }
            ]
        }, {
            name: 'Jane, average',
            data: [1, 3, 4, 3, 3, 5, 4]
        }, {
            name: 'John, average',
            data: [3, 4, 3, 5, 4, 10, 12]
        }]
    });
});