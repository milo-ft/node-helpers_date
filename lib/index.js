'use strict';

var _ = require('lodash');
var keys = require('./keys');

var defaultHandlers = {
  errorHandler: _.noop,
  now: Date.now
};
var handlers = _.cloneDeep(defaultHandlers);

module.exports = ( function exportsDate() {
  return {
    /**
     * Obtains a timestamp from specific format dates
     * @param string
     * @param format
     * @returns {number} the timestamp
     */
    timestampFromFormat: function timestampFromFormat(string, format) {
      var szs = {
        17: function tf17(str) {
          return Date.UTC(
            str.substr(4,4),
            +str.substr(0,2) - 1,
            str.substr(2,2),
            str.substr(8,2),
            str.substr(10,2),
            str.substr(12,2),
            str.substr(14)
          );
        },
        12: function tf12(str) {
          return Date.UTC(
            '20' + str.substr(0,2), // Y
            +str.substr(2,2) - 1, // m
            str.substr(4,2), // d
            str.substr(6,2),
            str.substr(8,2),
            str.substr(10,2)
          );
        },
        mdyhis: function tfmdyhis(str) {
          return Date.UTC(
            '20' + str.substr(4,2), // Y
            +str.substr(0,2) - 1, // m
            str.substr(2,2), // d
            str.substr(6,2),
            str.substr(8,2),
            str.substr(10,2)
          );
        }
      };
      if (!szs[format || string.length]) {
        handlers.errorHandler(new Error('Invalid date format ' + string));
        return 0;
      }
      return szs[format || string.length](string);
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
     * Returns a string formatted as yyyymmdd from a date object or a timestamp
     * @param date
     * @param separator
     * @returns {string}
     */
    yyyymmdd: function yyyymmdd( date, separator ) {
      separator = separator || '';
      if ( !date ) date = new Date(handlers.now());
      else if ( typeof date === 'number' ) date = new Date( date );
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth() + 1).toString();
      var dd  = date.getDate().toString();
      return yyyy + separator + (mm[ 1 ] ? mm : '0' + mm[ 0 ]) + separator + (dd[ 1 ] ? dd : '0' + dd[ 0 ]);
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
})();
