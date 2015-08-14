$(function () {
    var data = [
        {
            "hc-a2": "NT",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "WA",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "CT",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "SA",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "QL",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "NI",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "TS",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "JB",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "NS",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }, {
            "hc-a2": "VI",
            "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
            "value": 1100
        }
    ];

    // Initiate the chart
    $('#container').highcharts('Map', {
        title: {
            text: 'Highmaps motion'
        },

        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/au/au-all.js">Australia</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0,
            max: 1100
        },

        motion: {
            enabled: true,
            axisLabel: 'year',
            labels: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
            series: 0, // The series which holds points to update
            updateInterval: 50,
            magnet: {
                round: 'floor', // ceil / floor / round
                step: 0.1
            }
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['countries/au/au-all'],
            joinBy: null,
            name: 'Population',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                format: '{point.hc-a2}',
                enabled: true // Setting this to false currently helps a great deal on performance
            }
        }]
    });
});