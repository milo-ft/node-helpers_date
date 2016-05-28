'use strict';

function dateForKey(dimension, ts, delta) {
  if (typeof delta === 'undefined') delta = 0;
  return new Date(ts + delta * dimension);
}

var keys = module.exports = {
  all: { // a
    delta: 0,
    key: function allKey() { return 'a';},
    format: function allFormat() {
      return 'all';
    }
  },
  year: {
    key: function yearKey(ts, delta) { // 15
      var date = new Date(ts);
      if (typeof delta !== 'undefined') date.setUTCFullYear(date.getUTCFullYear() + delta);
      var nYear = date.getUTCFullYear() - 1900;
      if (nYear >= 100) nYear -= 100;
      return (nYear < 10 ? '0' + nYear : nYear).toString();
    },
    format: function yearFormat(str) {
      return '20' + str;
    }
  },
  month: {
    key: function monthKey(ts, delta) { // 1502
      var date = new Date(ts);
      if (typeof delta !== 'undefined') date.setUTCMonth(date.getUTCMonth() + delta);
      var mm = (date.getUTCMonth() + 1).toString();
      return keys.year.key(date) + (mm[1] ? mm : '0' + mm[0]);
    },
    format: function monthFormat(str) {
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2);
    }
  },
  day: {
    key: function dayKey(ts, delta) { // 150205
      var date = new Date(ts);
      if (typeof delta !== 'undefined') date.setUTCDate(date.getUTCDate() + delta);
      var dd = date.getUTCDate().toString();
      return keys.month.key(date) + (dd[1] ? dd : '0' + dd[0]);
    },
    format: function dayFormat(str) {
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    }
  },
  week: {
    delta: 604800000,
    key: function weekKey(ts, delta) { // 15006
      var date = dateForKey(keys.week.delta, ts, delta);
      var onejan = new Date(date.getUTCFullYear(), 0, 1);
      var w = Math.ceil((((date - onejan) / 86400000) + onejan.getUTCDay() + 1) / 7).toString();
      return keys.year.key(date) + '0' + (w[1] ? w : '0' + w[0]);
    },
    format: function weekFormat(str) {
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 3);
    }
  },
  weekday: {
    key: function weekdayKey(ts, delta) { // 6 finite
      var date = new Date(ts);
      if (typeof delta !== 'undefined') date.setUTCDate(date.getUTCDate() + delta);
      return date.getUTCDay().toString();
    },
    format: function weekdayFormat(str) {
      return str;
    }
  },
  schedule: {
    delta: 3600000,
    key: function scheduleKey(ts, delta) { // 609 finite
      var date = new Date(ts);
      if (typeof delta !== 'undefined') date.setUTCHours(date.getUTCHours() + delta);
      var h = date.getUTCHours().toString();
      return keys.weekday.key(date) + (h[1] ? h : '0' + h[0] );
    },
    format: function scheduleFormat(str) {
      return str.substr(0, 1) + '-' + str.substr(1, 2);
    }
  }
};
