$(function() {
    $.getJSON('http://data.highcharts.local/jsonp.php?filename=world-population-history.json&callback=?', function(data) {
        // console.log(data.entries[0]);
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
                data: data.entries,
                start: data.info.start,
                end: data.info.end,
                series: 1, // The series which holds points to update
                magnet: {
                    type: 'both', // thumb / point / both
                    round: 'round', // ceil / floor / round
                    smoothThumb: true, // defaults to true
                    step: 0.01
                }
            },

            credits: {
                enabled: false
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
                zMax: 1000000000,
                dataLabels: {
                    enabled: true,
                    format: '{point.code3}'
                }
            }]
        });
    });
    (function(H) {

        H.Chart.prototype.callbacks.push(function(chart) {
            if (chart.options.timeline && chart.options.timeline.enabled) {
                chart.timeline = new Timeline(chart);
            }
        });

        // Sets up elements and initial values
        function Timeline(chart) {
            var timeline = this,
                settings;
            // timeline settings variables
            this.chart = chart;
            this.timelineSettings = settings = this.chart.options.timeline;
            this.entries = settings.data;
            this.dataStructure = settings.dataStructure;
            this.startValue = settings.start;
            this.endValue = settings.end;
            this.paused = true;
            this.currentAxisValue = 0;
            this.points = this.chart.series[settings.series].points;
            this.magnetType = settings.magnet.type;
            this.roundType = settings.magnet.round;
            this.smoothThumb = (settings.magnet.smoothThumb !== undefined) ? settings.magnet.smoothThumb : true;
            this.step = settings.magnet.step;

            // Play-controls HTML-div
            this.playControls = H.createElement('div', {
                id: 'play-controls',
            }, null, this.chart.renderTo, null);

            // Play/pause HTML-button
            this.playPauseBtn = H.createElement('button', {
                id: 'play-pause-button',
                class: 'play fa fa-play',
                title: 'play'
            }, null, this.playControls, null);

            // Play-range HTML-input
            this.playRange = H.createElement('input', {
                id: 'play-range',
                type: 'range',
                value: this.startValue,
                min: this.startValue,
                max: this.endValue,
                step: this.step
            }, null, this.playControls, null);

            // Play-range HTML-output
            this.playOutput = H.createElement('output', {
                id: 'play-output',
                for: 'play-range',
                name: this.timelineSettings.axisLabel
            }, null, this.playControls, null);

            this.inputValue = parseFloat(this.playRange.value);

            Highcharts.addEvent(this.playPauseBtn, 'click', function() {
                timeline.togglePlayPause();
            });
            Highcharts.addEvent(this.playRange, 'mouseup', function() {
                timeline.attractToStep();
            });
            Highcharts.addEvent(this.playRange, 'input', function() {
                timeline.updateChart(this.value);
            });

            this.playOutput.innerHTML = this.round(this.playRange.value);
            this.updateChart(this.playRange.value);
        }

        // Toggles between Play and Pause states, and makes calls to changeButtonType()
        // From http://www.creativebloq.com/html5/build-custom-html5-video-player-9134473
        Timeline.prototype.togglePlayPause = function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        }

        Timeline.prototype.play = function() {
            var timeline = this;
            this.changeButtonType(this.playPauseBtn, 'pause');
            this.paused = false;
            this.timer = setInterval(function() {
                timeline.playUpdate();
            }, 10);
        }

        Timeline.prototype.pause = function() {
            this.changeButtonType(this.playPauseBtn, 'play');
            this.paused = true;
            clearInterval(this.timer);
            this.attractToStep();
        }

        // Updates a button's title, innerHTML and CSS class to a certain value
        Timeline.prototype.changeButtonType = function(btn, value) {
            btn.title = value;
            btn.className = value + " fa fa-" + value;
        }

        // Called continuously while playing
        Timeline.prototype.playUpdate = function() {
            var timeline = this;
            if (!this.paused) {
                this.inputValue = parseFloat(this.playRange.value);
                this.playRange.value = this.inputValue + this.step;
                this.attractToStep();
                this.updateChart(this.playRange.value); // Use playRange.value to get updated value
                if (this.playRange.value >= this.playRange.max) {
                    this.togglePlayPause();
                }
            }
        }

        // Updates chart data and calls redraw after all points are updated
        Timeline.prototype.updateChart = function(inputValue) {
            var timeline = this;
            this.inputValue = this.round(inputValue);
            if (this.currentAxisValue !== this.inputValue) {
                this.currentAxisValue = this.inputValue;
                Highcharts.each(this.points, function(point, i) {
                    if (timeline.entries[i].data[timeline.inputValue - timeline.startValue]) {
                        point.update(timeline.entries[i].data[timeline.inputValue - timeline.startValue], false);
                    }
                });
                this.chart.redraw({
                    duration: 200 // Animation duration
                });
                this.attractToStep();
            }
        }

        // TODO: De-uglify. Maybe recursive?
        Timeline.prototype.findData = function(i, key) {
            var firstLevelData,
                secondLevelData,
                thirdLevelData;
            if (this.dataStructure.type === 'array') {
                firstLevelData = this.entries[i];
            } else if (this.dataStructure.type === 'object') {
                firstLevelData = this.entries[key];
            }

            if (this.dataStructure.secondLevel) {
                if (this.dataStructure.secondLevel.type === 'array') {
                    secondLevelData = firstLevelData[i];
                } else if (this.dataStructure.secondLevel.type === 'object') {
                    secondLevelData = firstLevelData[key];
                }

                if (this.dataStructure.secondLevel.thirdLevel) {

                }
            } else {
                return firstLevelData;
            }
        }

        // Emphasizes current value either by moving thumb against point,
        // or highlighting point
        Timeline.prototype.attractToStep = function() {
            if (this.magnetType === 'thumb' && (this.paused || !this.smoothThumb)) {
                this.attractThumb();
            } else if (this.magnetType === 'point') {
                this.attractPoint();
            } else if (this.magnetType === 'both') {
                if (!this.smoothThumb) {
                    this.attractThumb();
                }
                            this.attractPoint();
            }
        }

        Timeline.prototype.attractThumb = function() {
            this.playRange.value = this.round(this.playRange.value);
        }

        Timeline.prototype.attractPoint = function() {
            this.playOutput.innerHTML = this.round(this.playRange.value);
        }

        // Returns an integer rounded up, down or even depending on
        // timeline.magnet.round settings.
        Timeline.prototype.round = function(number) {
            return Math[this.roundType](number);
        }
    }(Highcharts));
});