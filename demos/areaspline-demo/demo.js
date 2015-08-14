$(function () {
    $('#container').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Fruit consumption during a week'
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
        motion: {
            enabled: true,
            axisLabel: 'Week',
            labels: [
                "Week 31", "Week 32", "Week 33", "Week 34",
                "Week 35", "Week 36", "Week 37", "Week 38",
                "Week 39", "Week 40", "Week 41"
            ],
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
                    sequence: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    sequence: [5, 5, 7, 7, 3, 8, 9, 9, 1, 7, 3]
                }, {
                    sequence: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }, {
                    sequence: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    sequence: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }, {
                    sequence: [5, 5, 7, 7, 3, 8, 9, 9, 1, 7, 3]
                }, {
                    sequence: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }

            ]
        }, {
            name: 'John',
            data: [
                {
                    sequence: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }, {
                    sequence: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    sequence: [9, 1, 7, 3, 3, 2, 1, 4, 5, 6, 7]
                }, {
                    sequence: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
                }, {
                    sequence: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
                }, {
                    sequence: [9, 1, 7, 3, 3, 2, 1, 4, 5, 6, 7]
                }, {
                    sequence: [7, 1, 9, 3, 7, 4, 3, 8, 7, 1, 4]
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