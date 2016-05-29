'use strict';

module.exports = {
  'mmddyyyyhhiissfff': { // 05272016120000000
    rgx: /^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{2})(\d{3})$/,
    transform: function transformMmddyyyyhhiissfff(r) {
      return [r[3], r[1], r[2], r[4], r[5], r[6], r[7]];
    },
    format: function formatMmddyyyyhhiissfff(d) {
      return [d[1], d[2], d[0], d[3], d[4], d[5], d[6]].join('');
    }
  },

  'yymmddhhiiss': { // 160527120000
    rgx: /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    transform: function transformYymmddhhiiss(r) {
      return ['20' + r[1], r[2], r[3], r[4], r[5], r[6], 0];
    },
    format: function formatYymmddhhiiss(d) {
      return [d[0].substr(2), d[1], d[2], d[3], d[4], d[5]].join('');
    }
  },

  'mmddyyhhiiss': { // 052716120000
    rgx: /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    transform: function transformMmddyyhhiiss(r) {
      return ['20' + r[3], r[1], r[2], r[4], r[5], r[6], 0];
    },
    format: function formatMmddyyhhiiss(d) {
      return [d[1], d[2], d[0].substr(2), d[3], d[4], d[5]].join('');
    }
  },

  'yyyymmdd': {
    rgx: /^(\d{4})(\d{2})(\d{2})$/,
    transform: function transformYyyymmdd(r) {
      return [r[1], r[2], r[3], 0, 0, 0, 0];
    },
    format: function transformYyyymmdd( d ) {
      return [d[0], d[1], d[2]].join('');
    }
  },

  'dd/mm/yyyy hh:ii:ss': { // 15/04/2016 9:50:00
    rgx: /^(\d{2})\/(\d{2})\/(\d{4})\s(\d{1,2})\:(\d{2})\:(\d{2})$/,
    transform: function transformDdmmyyyyHhiiss(r) {
      return [r[3], r[2], r[1], r[4], r[5], r[6], 0];
    },
    format: function formatDdmmyyyyHhiiss(d) {
      return [ d[2], '/',d[1], '/', d[0], ' ',
               d[3], ':', d[4], ':', d[5]].join('');
    }
  },

  'yyyy-mm-dd hh:ii:ss.fff': { // 2016-05-27 12:00:00.000
    rgx: /^(\d{4})\-(\d{2})\-(\d{2})\s(\d{1,2})\:(\d{2})\:(\d{2})\.(\d{3})$/,
    transform: function transformYyyymmddHhiissFff(r) {
      return [r[1], r[2], r[3], r[4], r[5], r[6], r[7]];
    },
    format: function formatYyyymmddHhiissFff(d) {
      return [
        d[0], '-', d[1], '-', d[2], ' ',
        d[3], ':', d[4], ':', d[5], '.', d[6]].join('');
    }
  }
};
