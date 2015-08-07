$(function () {
    $.getJSON('http://data.highcharts.local/jsonp.php?filename=world-population-history.json&callback=?', function (data) {
        // console.log(data.entries[0]);
        // Initiate the chart
        // data.entries = data.entries.slice(230);
        // data = {
        //     info: {
        //         begin: 1960,
        //         end: 1981
        //     },
        //     entries: [
        //         {
        //             code3: "NOR",
        //             data: [1, 9, 5, 4, 2, 1, 9, 4, 2, 1, 9, 4, 2, 1, 9, 4, 2, 1, 9, 5, 4, 2]
        //         }, {
        //             code3: "SWE",
        //             data: [0, 2, 4, 9, 4, 2, 1, 9, 4, 2, 1, 9, 4, 2, 1, 9, 4, 2, 1, 9, 4, 1]
        //         }, {
        //             code3: "FIN",
        //             data: [4, 5, 8, 7, 3, 1, 6, 3, 7, 14, 1, 29, 20, 2, 7, 1, 7, 14, 2, 1, 9, 5]
        //         }, {
        //             code3: "RUS",
        //             data: [4, 5, 8, 7, 3, 1, 6, 3, 7, 14, 1, 29, 20, 2, 7, 1, 7, 14, 2, 1, 9, 5]
        //         }
        //     ]
        // }
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
                    round: 'round', // ceil / floor / round
                    smoothThumb: true, // defaults to true
                    step: 0.1
                }
            },

            tooltip: {
                enabled: false
            },

            credits: {
                enabled: false
            },

            series: [{
                mapData: Highcharts.maps['custom/world'],
                color: 'silver'
            }, {
                animation: false,
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
                    enabled: true, // This, apparently helps a GREAT deal on performance
                    format: '{point.code3}'
                }
            }]
        });
    });
});