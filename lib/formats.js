'use strict';

module.exports = {
  'mmddyyyyhhiissfff': { // 05272016120000000
    rgx: /^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{2})(\d{3})$/,
    transform: function transformMmddyyyyhhiissfff(r) {
      return [r[2], r[0], r[1], r[3], r[4], r[5], r[6]];
    },
    format: function formatMmddyyyyhhiissfff(d) {
      return [d[1], d[2], d[0], d[3], d[4], d[5], d[6]].join('');
    }
  },

  'yymmddhhiiss': { // 160527120000
    rgx: /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    transform: function transformYymmddhhiiss(r) {
      return ['20' + r[0], r[1], r[2], r[3], r[4], r[5], 0];
    },
    format: function formatYymmddhhiiss(d) {
      return [d[0].substr(2), d[1], d[2], d[3], d[4], d[5]].join('');
    }
  },

  'yyyymmddhhiiss': { // 20160527120000
    rgx: /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    transform: function transformYymmddhhiiss(r) {
      return [r[0], r[1], r[2], r[3], r[4], r[5], 0];
    },
    format: function formatYymmddhhiiss(d) {
      return [d[0], d[1], d[2], d[3], d[4], d[5]].join('');
    }
  },

  'mmddyyhhiiss': { // 052716120000
    rgx: /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    transform: function transformMmddyyhhiiss(r) {
      return ['20' + r[2], r[0], r[1], r[3], r[4], r[5], 0];
    },
    format: function formatMmddyyhhiiss(d) {
      return [d[1], d[2], d[0].substr(2), d[3], d[4], d[5]].join('');
    }
  },

  'yyyymmdd': {
    rgx: /^(\d{4})(\d{2})(\d{2})$/,
    transform: function transformYyyymmdd(r) {
      return [r[0], r[1], r[2], 0, 0, 0, 0];
    },
    format: function formatYyyymmdd( d ) {
      return [d[0], d[1], d[2]].join('');
    }
  },

  'mm-dd-yyyy': {
    rgx: /^(\d{1,2})\-(\d{1,2})\-(\d{4})$/,
    transform: function transformMmddyyyy(r) {
      return [r[2], r[0], r[1], 0, 0, 0, 0];
    },
    format: function formatMmddyyyy( d ) {
      return [d[1], d[2], d[0]].join('-');
    }
  },

  'dd/mm/yyyy': {
    rgx: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    transform: function transformDdmmyyyy(r) {
      return [r[2], r[1], r[0], 0, 0, 0, 0];
    },
    format: function formatDdmmyyyy( d ) {
      return [d[2], d[1], d[0]].join('/');
    }
  },

  'dd/mm': {
    rgx: /^(\d{1,2})\/(\d{1,2})$/,
    transform: function transformDdmm(r) {
      return [1970, r[1], r[0], 0, 0, 0, 0];
    },
    format: function formatDdmm( d ) {
      return [d[2], d[1]].join('/');
    }
  },

  'hh:mm': {
    rgx: /^(\d{1,2})\:(\d{2})$/,
    transform: function transformHhmm(r) {
      return [1970, 1, 1, r[0], r[1], 0, 0];
    },
    format: function formatHhmm( d ) {
      return [d[3], d[4]].join(':');
    }
  },

  'dd/mm/yyyy hh:ii:ss': { // 15/04/2016 9:50:00
    rgx: /^(\d{2})\/(\d{2})\/(\d{4})\s(\d{1,2})\:(\d{2})\:(\d{2})$/,
    transform: function transformDdmmyyyyHhiiss(r) {
      return [r[2], r[1], r[0], r[3], r[4], r[5], 0];
    },
    format: function formatDdmmyyyyHhiiss(d) {
      return [ d[2], '/',d[1], '/', d[0], ' ',
               d[3], ':', d[4], ':', d[5]].join('');
    }
  },

  'yyyy-mm-dd hh:ii:ss.fff': { // 2016-05-27 12:00:00.000
    rgx: /^(\d{4})\-(\d{2})\-(\d{2})\s(\d{1,2})\:(\d{2})\:(\d{2})\.(\d{3})$/,
    transform: function transformYyyymmddHhiissFff(r) {
      return [r[0], r[1], r[2], r[3], r[4], r[5], r[6]];
    },
    format: function formatYyyymmddHhiissFff(d) {
      return [
        d[0], '-', d[1], '-', d[2], ' ',
        d[3], ':', d[4], ':', d[5], '.', d[6]].join('');
    }
  }
};
