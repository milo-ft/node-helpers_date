'use strict';

var _ = require('lodash');
var dateFormats = require('./formats');
var keys = require('./keys');

var defaultHandlers = {
  errorHandler: _.noop,
  now: Date.now
};
var handlers = _.cloneDeep(defaultHandlers);

module.exports = ( function exportsDate() {
  var methods = {
    /**
     * Returns an array of valid formats to be parsed
     * @returns {Array}
     */
    validFormats: function validFormats() {
      return _.keys(dateFormats);
    },

    /**
     * Obtains a timestamp from specific format dates
     * @param string
     * @param format
     * @returns {number} the timestamp
     */
    timestampFromFormat: function timestampFromFormat(string, formats) {
      if (!string.length) return 0;

      var buildFromParsed = function buildFromParsed(parsed) {
        return Date.UTC(
          +parsed[0],
          +parsed[1] - 1,
          +parsed[2],
          +parsed[3],
          +parsed[4],
          +parsed[5],
          +parsed[6]
        );
      };

      if (!formats) formats = methods.validFormats();
      if (!_.isArray(formats)) formats = [formats];

      var isIncluded = _.every(formats, function isIncluded(f) {
        return _.includes(methods.validFormats(), f);
      });
      if (!isIncluded) {
        handlers.errorHandler(new Error('Invalid date format ' + formats.join(', ')));
        return 0;
      }

      var i = 0;
      var result;

      while (i < formats.length && typeof result === 'undefined') {
        if (dateFormats[formats[i]].rgx.test(string)) {
          var r = string.match(dateFormats[formats[i]].rgx);
          result = buildFromParsed(dateFormats[formats[i]].transform(r));
        }
        i++;
      }

      if (!result) {
        var msg = 'Invalid date format ' + string +
                  ' with tested formats: ' + formats.join(', ');
        handlers.errorHandler(new Error(msg));
        return 0;
      }
      return result;
    },

    /**
     * Returns a formatted string from a timestamp or date
     * @param date
     * @param format
     * @returns {string}
     */
    timestampToFormat: function timestampToFormat(date, format) {
      if ( typeof date === 'number' ) date = new Date( date );

      if (!_.includes(methods.validFormats(), format)) {
        handlers.errorHandler(new Error('Invalid date format ' + format));
        return '';
      }
      return dateFormats[format].format(methods.toArray(date, true));
    },

    /**
     * Returns an array of parts of date from a timestamp or date
     * @param date
     * @param padded if padded strings must be returned
     * @returns {array}
     */
    toArray: function toArray(date, padded) {
      if ( typeof date === 'number' ) date = new Date( date );
      var arr = date.toISOString().
        match(/(\d{4})-(\d{2})-(\d{2})\w(\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
      arr.shift();
      return padded ? arr : _.map(arr, function mapDate(a) { return +a; });
    },

    /**
     * Returns the default date format
     * @param time
     * @returns {string}
     */
    toString: function toString(time) {
      time = time || handlers.now();
      return new Date(time).toISOString();
    },

    /**
     * Parses the default date format
     * @param dateStr
     * @returns {number}
     */
    tsFromIso8601: function tsFromIso8601(dateStr) {
      if (!dateStr) return handlers.now();
      return Date.parse(dateStr);
    },

    /**
     * Converts a day number to a date object
     * @param num
     * @returns {Date}
     */
    fromNum: function fromNum(num) {
      return new Date((num || handlers.now()).
                toString().
                replace(/(\d{4})(\d\d)(\d\d)/g, '$1-$2-$3'));
    },

    /**
     * Converts a date to a day number
     * @param date
     * @returns {number}
     */
    toNum: function toNum(date) {
      return +date.toISOString().substr(0,10).replace(/-/g,'');
    },

    /**
     * Returns an array of valid periods
     * @returns {Array}
     */
    keyPeriods: function keyPeriods() {
      return _.keys(keys);
    },

    /**
     * Obtains a key based on a period and a time
     * @param period (a valid period)
     * @param time
     * @param delta (an integer to modify the time according to period)
     * @returns {String}
     *
     *  IMPORTANT: Only support keys after year 2000
     */
    keyForPeriod: function keyForPeriod(period, time, delta) {
      if (!keys[period]) {
        handlers.errorHandler(new Error('Unhandled date period key:' + period));
        return '';
      }
      if (!time && time !== 0) time = handlers.now();
      return keys[period].key(time, delta);
    },

    /**
     * Format a string to a valid date input from a key
     * @param period
     * @param key
     * @returns String
     *
     *  IMPORTANT: Only support keys after year 2000
     *
     */
    keyFormat: function keyFormat(period, key) {
      if (!keys[period]) {
        handlers.errorHandler(new Error('Unhandled date period key:' + period));
        return '';
      }
      return keys[period].format( key );
    },

    /**
     * Returns the hour of a time with timezone offset
     * @param date or timestamp
     * @param offset in milliseconds
     * @returns {number}
     */
    hrWithOffset: function buildHr(date, offset) {
      if ( !date ) date = new Date(handlers.now());
      else if ( typeof date === 'number' ) date = new Date( date );
      var hrOffset = parseInt((offset || 0) / (3600 * 1000), 10);
      return (date.getUTCHours() + 24 + hrOffset) % 24;
    },

    /**
     * Returns a key for grouping times with timezone offset
     * @param time
     * @param groupSize
     * @param offset
     * @returns {string}
     */
    timeGroup: function timeGroup(time, groupSize, offset) {
      var hr = methods.hrWithOffset(time, offset);
      if (!hr) hr = '00';
      else hr = hr >= 10 ? hr : '0' + hr;
      var min = new Date( Math.floor(time / groupSize) * groupSize).getUTCMinutes();
      return hr + ( min >= 10 ? min : '0' + min ).toString();
    },

    /**
     * Round a date to the start of that day and returns its timestamp
     * @param date
     * @returns {number}
     */
    roundDateToDay: function roundTimeToDay(date) {
      if ( !date ) date = new Date(handlers.now());
      else if ( typeof date === 'number' ) date = new Date( date );
      return new Date(date.toISOString().substr(0,10)).getTime();
    },

    /**
     * Creates a range of days and times with a timezone offset
     * @param time
     * @param startDelta
     * @param endDelta
     * @param timeOffset in milliseconds
     * @returns {Array}
     */
    createRelativeDayRange: function createRelativeDayRange(time, startDelta, endDelta, timeOffset) {
      if (typeof time === 'object') time = time.getTime();
      var start = new Date(methods.roundDateToDay(time + timeOffset));
      var end = new Date(methods.roundDateToDay(time + timeOffset));

      start.setUTCDate(start.getUTCDate() + startDelta);
      end.setUTCDate(end.getUTCDate() + endDelta);

      var days = [];
      while (start <= end) {
        days.push({
          day: methods.toNum(start),
          time: start.getTime() - timeOffset
        });
        var newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
      }
      return days;
    },

    /**
     * Returns the current time handled by the module
     * @returns {number}
     */
    now: function now() {
      return handlers.now();
    },

    /**
     * Fixes the time at a specific moment
     * @param {number}
     */
    fixAt: function fixAt( ts ) {
      /* eslint-disable func-names */
      handlers.now = function() { return +ts; };
      /* eslint-enable func-names */
    },

    /**
     * Resets the current time to default function
     */
    reset: function reset() {
      /* eslint-disable func-names */
      handlers.now = (function() { return defaultHandlers.now; })();
      /* eslint-enable func-names */
    },

    /**
     * sets the function to handle errors
     * @param handler
     */
    setErrorHandler: function setErrorHandler(handler) {
      handlers.errorHandler = handler;
    }
  };

  return methods;
})();
