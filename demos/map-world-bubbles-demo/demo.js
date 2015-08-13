$(function () {
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=world-population-history.json&callback=?', function (data) {
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

            timeline: {
                enabled: true,
                axisLabel: 'year',
                labels: [
                    1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 
                    1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 
                    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 
                    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 
                    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 
                    2010, 2011, 2012, 2013
                ],
                series: 1, // The series which holds points to update
                updateInterval: 10,
                magnet: {
                    round: 'floor', // ceil / floor / round
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