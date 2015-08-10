$(function () {
    $.getJSON('http://data.highcharts.local/jsonp.php?filename=world-population-history.json&callback=?', function (data) {
        // Initiate the chart
        $('#container').highcharts('Map', {
            title: {
                text: 'Highmaps timeline'
            },

            xAxis: {
                min: -999
            },

            yAxis: {
                min: -9851
            },

            subtitle: {
                text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World</a>'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                min: 0,
                max: 10000
            },

            timeline: {
                enabled: true,
                axisLabel: 'year',
                begin: data.info.start,
                end: data.info.end,
                // TODO add interval
                series: 1, // The series which holds points to update
                updateInterval: 10,
                magnet: {
                    type: 'both', // thumb / point / both
                    round: 'floor', // ceil / floor / round
                    smoothThumb: true, // defaults to true
                    step: 0.1
                }
            },

            series: [{
                mapData: Highcharts.maps['custom/world'],
                color: 'silver'
            }, {
                data: data.entries,
                mapData: Highcharts.maps['custom/world'],
                joinBy: ['iso-a3', 'code3'],
                name: 'Population',
                type: 'mapbubble',
                zMin: 0,
                zMax: 1000000000, // 1000000000
                maxSize: "20%",
                minSize: "2",
                dataLabels: {
                    format: '{point.code3}',
                    enabled: false // Setting this to false currently helps a great deal on performance
                }
            }]
        });
    });
});