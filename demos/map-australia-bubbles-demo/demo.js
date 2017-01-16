var data = [
    {
        "hc-a2": "NT",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "WA",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "CT",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "SA",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "QL",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "NI",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "TS",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "JB",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "NS",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }, {
        "hc-a2": "VI",
        "sequence": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
        "z": 1100
    }
];
// Initiate the chart
Highcharts.mapChart('container', {
    title: {
        text: 'Highmaps motion'
    },

    xAxis: {
        min: 0
    },

    yAxis: {
        min: -9851
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

    motion: {
        enabled: true,
        axisLabel: 'year',
        labels: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
        loop: true,
        series: 1, // The series which holds points to update
        updateInterval: 50,
        magnet: {
            round: 'round', // ceil / floor / round
            step: 0.1
        }
    },

    series: [{
        mapData: Highcharts.maps['countries/au/au-all'],
        color: 'silver'
    }, {
        data: data,
        mapData: Highcharts.maps['countries/au/au-all'],
        joinBy: 'hc-a2',
        name: 'Population',
        type: 'mapbubble',
        zMin: 0,
        zMax: 1100, // 1000000000
        maxSize: "20%",
        minSize: "2",
        dataLabels: {
            format: '{point.hc-a2}',
            enabled: true // Setting this to false currently helps a great deal on performance
        }
    }]
});
