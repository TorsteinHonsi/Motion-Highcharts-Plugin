(function (H) {

    // Sets up elements and initial values
    function Timeline(chart) {
        var timeline = this,
            settings;
        // timeline settings variables
        this.chart = chart;
        if (!this.chart.options.timeline.enabled) {
            return;
        }
        console.log(H.seriesTypes);
        if (H.seriesTypes.area) {
            H.seriesTypes.area.prototype.valueToUpdate = 'y';
        }
        if (H.seriesTypes.areaspline) {
            H.seriesTypes.areaspline.prototype.valueToUpdate = 'y';
        }
        if (H.seriesTypes.bubble) {
            H.seriesTypes.bubble.prototype.valueToUpdate = 'z';
        }
        if (H.seriesTypes.column) {
            H.seriesTypes.column.prototype.valueToUpdate = 'y';
        }
        if (H.seriesTypes.heatmap) {
            H.seriesTypes.heatmap.prototype.valueToUpdate = 'value';
        }
        if (H.seriesTypes.line) {
            H.seriesTypes.line.prototype.valueToUpdate = 'value';
        }
        if (H.seriesTypes.map) {
            H.seriesTypes.map.prototype.valueToUpdate = 'value';
        }
        if (H.seriesTypes.mapbubble) {
            H.seriesTypes.mapbubble.prototype.valueToUpdate = 'z';
        }
        if (H.seriesTypes.mapline) {
            H.seriesTypes.mapline.prototype.valueToUpdate = ['x', 'y']; // TODO: support for multiple axis updates
        }
        if (H.seriesTypes.mappoint) {
            H.seriesTypes.mappoint.prototype.valueToUpdate = ['x', 'y'];
        }
        if (H.seriesTypes.pie) {
            H.seriesTypes.pie.prototype.valueToUpdate = 'y';
        }
        if (H.seriesTypes.scatter) {
            H.seriesTypes.scatter.prototype.valueToUpdate = ['x', 'y'];
        }
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
        this.beginValue = settings.begin;
        this.endValue = settings.end;
        this.paused = true;
        this.updateInterval = settings.updateInterval;
        this.currentAxisValue = this.beginValue - 1;
        this.magnetType = settings.magnet.type;
        this.roundType = settings.magnet.round;
        this.smoothThumb = (settings.magnet.smoothThumb !== undefined) ? settings.magnet.smoothThumb : true;
        this.step = settings.magnet.step;

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
            value: this.endValue - this.beginValue,
            min: 0,
            max: this.endValue - this.beginValue,
            step: this.step
        }, null, this.playControls, null);

        // Play-range HTML-output
        this.playOutput = H.createElement('label', {
            id: 'play-output',
            name: this.timelineSettings.axisLabel
        }, null, this.playControls, null);
        this.playOutput.innerHTML = this.beginValue;

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
            default: return;
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
        this.updateChart(this.playRange.value);
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
        var resetValue = this.playRange.value = this.playRange.min;
        this.updateChart(resetValue);
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
            if (this.inputValue >= parseFloat(this.playRange.max)) { // Auto-pause
                this.playRange.value = this.inputValue + this.step;
                this.pause();
            }
        }
    };

    // Updates chart data and redraws the chart
    Timeline.prototype.updateChart = function (inputValue) {
        var newPointOptions,
            valueToUpdate,
            seriesKey,
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
                        valueToUpdate = series.valueToUpdate;
                        console.log(valueToUpdate);
                        newPointOptions = {};
                        newPointOptions[valueToUpdate] = point.data[this.inputValue];
                        point.update(newPointOptions, false, false);
                    }
                }
            }
            this.chart.redraw();
            this.attractToStep();
        }
    };

    // Emphasizes current value either by moving thumb against point,
    // or highlighting point
    Timeline.prototype.attractToStep = function () {
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
    };

    Timeline.prototype.attractThumb = function () {
        this.playRange.value = this.round(this.playRange.value);
    };

    Timeline.prototype.attractPoint = function () {
        this.playOutput.innerHTML = this.round(this.playRange.value) + this.beginValue;
    };

    // Returns an integer rounded up, down or even depending on
    // timeline.magnet.round settings.
    Timeline.prototype.round = function (number) {
        return Math[this.roundType](number);
    };

    H.Chart.prototype.callbacks.push(function (chart) {
        if (chart.options.timeline && chart.options.timeline.enabled) {
            chart.timeline = new Timeline(chart);
        }
    });
}(Highcharts));