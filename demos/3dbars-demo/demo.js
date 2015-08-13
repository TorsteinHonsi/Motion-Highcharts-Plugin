$(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            }
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
            labels: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
            series: [0, 1], // The series which holds points to update
            autoPlay : true,
            updateInterval: 10,
            magnet: {
                round: 'floor', // ceil / floor / round
                step: 0.02
            }
        },
        plotOptions: {
            column: {
                depth: 25
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

    function showValues() {
        $('#R0-value').html(chart.options.chart.options3d.alpha);
        $('#R1-value').html(chart.options.chart.options3d.beta);
    }

    // Activate the sliders
    $('#R0').on('change', function () {
        chart.options.chart.options3d.alpha = this.value;
        showValues();
        chart.redraw(true);
    });
    $('#R1').on('change', function () {
        chart.options.chart.options3d.beta = this.value;
        showValues();
        chart.redraw(true);
    });

    showValues();
});