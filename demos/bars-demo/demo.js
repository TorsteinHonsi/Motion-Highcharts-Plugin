Highcharts.chart('container', {
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
    motion: {
        enabled: true,
        axisLabel: 'year',
        labels: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
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
                sequence: [1, 5, 2, 7, 7, 1, 6, 9, 2, 5, 1]
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
            }
        ]
    }]
});
