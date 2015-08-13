/**
 * @license http://creativecommons.org/licenses/by-sa/4.0/ Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
 * @author  Lars Cabrera
 * @version 1.0.1
 */

// JSLint options:
/*global Highcharts, window*/

(function (H) {
    // Sets up timeline ready to use
    function Timeline(chart) {
        var timeline = this,
            settings;

        this.chart = chart;
        this.timelineSettings = settings = this.chart.options.timeline;
        this.dataSeries = [];
        if (settings.series.constructor === Array) { // Multiple series with data
            Highcharts.each(this.chart.series, function (series, index) {
                if (settings.series.indexOf(index) >= 0) {
                    timeline.dataSeries[index] = series;
                }
            });
        } else { // Only one series with data
            this.dataSeries[settings.series] = this.chart.series[settings.series];
        }
        this.labels = settings.labels;
        this.loop = settings.loop === true;
        this.paused = true;
        this.updateInterval = 10;
        if (settings.updateInterval !== undefined) {
            this.updateInterval = settings.updateInterval;
        }
        this.axisLabel = 'year';
        if (settings.axisLabel !== undefined) {
            this.axisLabel = settings.axisLabel;
        }

        // Magnet settings
        this.magnetType = 'both';
        this.roundType = 'round';
        this.step = 0.01;
        this.autoPlay = settings.autoPlay === true;
        if (settings.magnet !== undefined) {
            if (settings.magnet.type !== undefined) {
                this.magnetType = settings.magnet.type;
            }
            if (settings.magnet.round !== undefined) {
                this.roundType = settings.magnet.round;
            }
            if (settings.magnet.step !== undefined) {
                this.step = settings.magnet.step;
            }
        }

        // Play-controls HTML-div
        this.playControls = H.createElement('div', {
            id: 'play-controls'
        }, null, this.chart.renderTo, null);

        // Play/pause HTML-button
        this.playPauseBtn = H.createElement('button', {
            id: 'play-pause-button',
            title: 'play'
        }, null, this.playControls, null);
        this.playPauseBtn.className = "fa fa-play";

        // Play-range HTML-input
        this.playRange = H.createElement('input', {
            id: 'play-range',
            type: 'range',
            value: this.labels.length - 1,
            min: 0,
            max: this.labels.length - 1,
            step: this.step
        }, null, this.playControls, null);

        // Play-range HTML-output
        this.playOutput = H.createElement('label', {
            id: 'play-output',
            name: this.timelineSettings.axisLabel
        }, null, this.playControls, null);
        this.playOutput.innerHTML = this.labels[this.labels.length - 1];

        // Bind controls to events
        Highcharts.addEvent(this.playPauseBtn, 'click', function () {
            timeline.togglePlayPause();
        });
        Highcharts.addEvent(this.playRange, 'mouseup', function () {
            timeline.attractToStep();
        });
        Highcharts.addEvent(this.playRange, 'input', function () {
            timeline.updateChart(this.value);
        });

        function handleKeyEvents(e) {
            e = e || window.event;
            switch (e.which) {
            case 32: // Space
                timeline.togglePlayPause();
                break;
            case 37: // Left
                timeline.playRange.value = timeline.round(parseFloat(timeline.playRange.value) - 1);
                timeline.updateChart(timeline.playRange.value);
                break;
            case 39: // Right
                timeline.playRange.value = timeline.round(parseFloat(timeline.playRange.value) + 1);
                timeline.updateChart(timeline.playRange.value);
                break;
            default:
                return;
            }
            e.preventDefault();
        }

        // Request focus to the controls when clicking on controls div
        Highcharts.addEvent(this.playControls, 'click', function () {
            timeline.playRange.focus();
        });
        // Bind keys to events
        Highcharts.addEvent(this.playPauseBtn, 'keydown', handleKeyEvents);
        Highcharts.addEvent(this.playRange, 'keydown', handleKeyEvents);

        // Initial value
        this.inputValue = parseFloat(this.playRange.value);

        // Initial update
        this.updateChart(this.inputValue);

        // Auto-play
        if (this.autoPlay) {
            this.play();
        }
    }

    // Toggles between Play and Pause states, and makes calls to changeButtonType()
    // From http://www.creativebloq.com/html5/build-custom-html5-video-player-9134473
    Timeline.prototype.togglePlayPause = function () {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    };

    // Plays the timeline, continuously updating the chart
    Timeline.prototype.play = function () {
        var timeline = this;
        if (this.paused && parseFloat(this.playRange.value) === parseFloat(this.playRange.max)) {
            this.reset();
        }
        this.changeButtonType('pause');
        this.paused = false;
        this.timer = setInterval(function () {
            timeline.playUpdate();
        }, this.updateInterval);
    };

    // Pauses the timeline, which stops updating the chart
    Timeline.prototype.pause = function () {
        this.changeButtonType('play');
        this.paused = true;
        window.clearInterval(this.timer);
        this.attractToStep();
    };

    // Resets the timeline and updates the chart. Does not pause
    Timeline.prototype.reset = function () {
        this.playRange.value = this.playRange.min;
        this.updateChart(this.playRange.value);
    };

    // Updates a button's title, innerHTML and CSS class to a certain value
    Timeline.prototype.changeButtonType = function (value) {
        this.playPauseBtn.title = value;
        this.playPauseBtn.className = value + " fa fa-" + value;
    };

    // Called continuously while playing
    Timeline.prototype.playUpdate = function () {
        if (!this.paused) {
            this.inputValue = parseFloat(this.playRange.value);
            this.playRange.value = this.inputValue + this.step;
            this.attractToStep();
            this.updateChart(this.playRange.value); // Use playRange.value to get updated value
            if (this.playRange.value >= parseFloat(this.playRange.max)) { // Auto-pause
                if (this.loop) {
                    this.reset();
                } else {
                    this.pause();
                }
            }
        }
    };

    // Updates chart data and redraws the chart
    Timeline.prototype.updateChart = function (inputValue) {
        var seriesKey,
            series,
            point,
            i;
        this.inputValue = this.round(inputValue);
        if (this.currentAxisValue !== this.inputValue) {
            this.currentAxisValue = this.inputValue;
            for (seriesKey in this.dataSeries) {
                if (this.dataSeries.hasOwnProperty(seriesKey)) {
                    series = this.dataSeries[seriesKey];
                    for (i = 0; i < series.data.length; i++) {
                        point = series.data[i];
                        try {
                            point.update(point.data[this.inputValue], false, false);
                        } catch (e) {
                            console.error('Error:', e, ' \nat point:', point, ' \nwith new value:', point.data[this.inputValue]);
                        }
                    }
                }
            }
            this.chart.redraw();
            this.attractToStep();
        }
    };

    // Moves output value to data point
    Timeline.prototype.attractToStep = function () {
        this.playOutput.innerHTML = this.labels[this.round(this.playRange.value)];
    };

    // Returns an integer rounded up, down or even depending on
    // timeline.magnet.round settings.
    Timeline.prototype.round = function (number) {
        return Math[this.roundType](number);
    };

    // Initiates timeline automatically if timeline settings object exists and
    // is not disabled
    H.Chart.prototype.callbacks.push(function (chart) {
        if (chart.options.timeline !== undefined && chart.options.timeline.enabled !== false) {
            chart.timeline = new Timeline(chart);
        }
    });
}(Highcharts));