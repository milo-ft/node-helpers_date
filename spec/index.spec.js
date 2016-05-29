"use strict";

var date = require('../');
var timestamp = 1464350400000;

describe('timestampFromFormat & error handler', function() {
  it('should return valid formats for dates', function() {
    var cases = [
      { // mmddyyyyhhiissfff
        string: '05272016120000000',
        formats: 'mmddyyyyhhiissfff',
        timestamp: timestamp
      },
      { // yymmddhhiiss
        string: '160527120000',
        formats: 'yymmddhhiiss',
        timestamp: timestamp
      },
      { // mmddyyhhiiss
        string: '052716120000',
        formats: 'mmddyyhhiiss',
        timestamp: timestamp
      },
      { // yyyymmdd
        string: '20160527',
        formats: 'yyyymmdd',
        timestamp: timestamp - 12 * 3600 * 1000
      },

      { // mm-dd-yyyy
        string: '05-27-2016',
        formats: 'mm-dd-yyyy',
        timestamp: timestamp - 12 * 3600 * 1000
      },
      { // with one digit
        string: '5-27-2016',
        formats: 'mm-dd-yyyy',
        timestamp: timestamp - 12 * 3600 * 1000
      },
      {
        string: '5-1-2016',
        formats: 'mm-dd-yyyy',
        timestamp: 1462060800000
      },
      { // dd/mm/yyyy
        string: '27/05/2016',
        formats: 'dd/mm/yyyy',
        timestamp: timestamp - 12 * 3600 * 1000
      },
      { // with one digit month
        string: '27/5/2016',
        formats: 'dd/mm/yyyy',
        timestamp: timestamp - 12 * 3600 * 1000
      },
      { // with one digit month and day
        string: '1/5/2016',
        formats: 'dd/mm/yyyy',
        timestamp: 1462060800000
      },
      { // dd/mm
        string: '27/05',
        formats: 'dd/mm',
        timestamp: 12614400000
      },
      { // with one digit month
        string: '27/5',
        formats: 'dd/mm',
        timestamp: 12614400000
      },
      { // with one digit month and day
        string: '1/5',
        formats: 'dd/mm',
        timestamp: 10368000000
      },
      { // hh:mm
        string: '14:37',
        formats: 'hh:mm',
        timestamp: 52620000
      },
      { // with one digit hr
        string: '9:21',
        formats: 'hh:mm',
        timestamp: 33660000
      },
      { // dd/mm/yyyy hh:ii:ss
        string: '27/05/2016 12:00:00',
        formats: 'dd/mm/yyyy hh:ii:ss',
        timestamp: timestamp
      },
      { // with 1 digit hr
        string: '27/05/2016 9:00:00',
        formats: 'dd/mm/yyyy hh:ii:ss',
        timestamp: timestamp - 3 * 3600 * 1000
      },

      { // yyyy-mm-dd hh:ii:ss.fff
        string: '2016-05-27 12:00:00.000',
        formats: 'yyyy-mm-dd hh:ii:ss.fff',
        timestamp: timestamp
      },
      { // with 1 digit hr
        string: '2016-05-27 9:00:00.000',
        formats: 'yyyy-mm-dd hh:ii:ss.fff',
        timestamp: timestamp - 3 * 3600 * 1000
      }
    ];

    var testFn = function(testCase) {
      var b = date.timestampFromFormat(testCase.string, testCase.formats);
      expect(b).toBe(testCase.timestamp);
    };

    cases.forEach(testFn);
  });

  it('should test a string against multiple date formats', function() {
    // All formats
    var a = date.timestampFromFormat('2016-05-27 12:00:00.000');
    expect(a).toBe(timestamp);

    // No formats
    var b = date.timestampFromFormat('2016-05-27 12:00:00.000', []);
    expect(b).toBe(0);

    // Selected formats
    var c = date.timestampFromFormat('052716120000', ['mmddyyhhiiss', 'yymmddhhiiss']);
    expect(c).toBe(timestamp);
    var d = date.timestampFromFormat('052716120000', ['dd/mm/yyyy hh:ii:ss', 'mmddyyhhiiss']);
    expect(d).toBe(timestamp);

    // Not selected formats
    var b = date.timestampFromFormat('2016-05-27 12:00:00.000', ['yymmddhhiiss']);
    expect(b).toBe(0);
  });

  it('should call handler error with invalid format date', function() {
    var handler = {error: function(err) {}};
    spyOn(handler, 'error');
    date.setErrorHandler(handler.error);

    date.timestampFromFormat('052716120000', 'mmddyyhhiissxxx');
    expect(handler.error).toHaveBeenCalled();

  });
});

describe('timestampToFormat', function() {
  it('should return a timestamp from different formats', function() {
    var cases = [
      { // mmddyyyyhhiissfff
        string: '05272016120000000',
        format: 'mmddyyyyhhiissfff',
        timestamp: timestamp
      },
      { // yymmddhhiiss
        string: '160527120000',
        format: 'yymmddhhiiss',
        timestamp: timestamp
      },
      { // mmddyyhhiiss
        string: '052716120000',
        format: 'mmddyyhhiiss',
        timestamp: timestamp
      },
      { // yyyymmdd
        string: '20160527',
        format: 'yyyymmdd',
        timestamp: timestamp - 12 * 3600 * 1000
      },
      { // mm-dd-yyyy
        string: '05-27-2016',
        format: 'mm-dd-yyyy',
        timestamp: timestamp - 12 * 3600 * 1000
      },
      { // dd/mm/yyyy
        string: '27/05/2016',
        format: 'dd/mm/yyyy',
        timestamp: timestamp - 12 * 3600 * 1000
      },
      { // dd/mm
        string: '27/05',
        format: 'dd/mm',
        timestamp: 12614400000
      },
      { // hh:mm
        string: '14:37',
        format: 'hh:mm',
        timestamp: 52620000
      },
      { // with one digit hr
        string: '09:21',
        format: 'hh:mm',
        timestamp: 33660000
      },
      { // dd/mm/yyyy hh:ii:ss
        string: '27/05/2016 12:00:00',
        format: 'dd/mm/yyyy hh:ii:ss',
        timestamp: timestamp
      },
      { // with 1 digit hr
        string: '27/05/2016 09:00:00',
        format: 'dd/mm/yyyy hh:ii:ss',
        timestamp: timestamp - 3 * 3600 * 1000
      },

      { // yyyy-mm-dd hh:ii:ss.fff
        string: '2016-05-27 12:00:00.000',
        format: 'yyyy-mm-dd hh:ii:ss.fff',
        timestamp: timestamp
      },
      { // with 1 digit hr
        string: '2016-05-27 09:00:00.000',
        format: 'yyyy-mm-dd hh:ii:ss.fff',
        timestamp: timestamp - 3 * 3600 * 1000
      }
    ];

    var testFn = function(testCase) {
      var b = date.timestampToFormat(testCase.timestamp, testCase.format);
      expect(b).toBe(testCase.string);
    };

    cases.forEach(testFn);
  });
});

describe('toArray', function() {
  it('should return an array with the date components', function() {
    var t = date.toArray(new Date('2016-05-27T12:34:05.391Z'));
    expect(t.join(',')).toBe('2016,5,27,12,34,5,391');
  });

  it('should return an array with the date components with padded strings', function() {
    var t = date.toArray(new Date('2016-05-27T12:34:05.391Z').getTime(), true);
    expect(t.join(',')).toBe('2016,05,27,12,34,05,391');
  });
});

describe('default formats', function() {
  it('should return the default date format', function() {
    var t = date.toString(timestamp);
    expect(t).toBe('2016-05-27T12:00:00.000Z');
  });

  it('should return the default date format', function() {
    var t = date.tsFromIso8601('2016-05-27T12:00:00.000Z');
    expect(t).toBe(timestamp);
  });
});

describe('Date to number conversion', function() {
  it('should convert a date to a number', function() {
    var t = date.toNum(new Date(timestamp));
    expect(t).toBe(20160527);
  });

  it('should convert a number to a date', function() {
    var t = date.fromNum(20160527);
    expect(t.toISOString()).toBe('2016-05-27T00:00:00.000Z');
  });
});

describe('hrWithOffset', function() {
  it('should return the hour of day with offset applied', function() {
    var cases = [
      {
        date: '2016-05-27T18:52:53.113Z',
        offset: null,
        result: 18
      },
      {
        date: '2016-05-27T23:52:53.113Z',
        offset: 3 * 3600 * 1000,
        result: 2
      },
      {
        date: '2016-05-27T01:52:53.113Z',
        offset: -1 * 3600 * 1000,
        result: 0
      },
      {
        date: '2016-05-27T02:52:53.113Z',
        offset: -4 * 3600 * 1000,
        result: 22
      }
    ];

    var testFn = function testFn(testCase) {
      var t = date.hrWithOffset(new Date(testCase.date), testCase.offset);
      expect(t).toBe(testCase.result);
    };
    cases.forEach(testFn);
  });
});

describe('timeGroup', function() {
  it('should return a timegroup for a time with offset applied', function() {
    var cases = [
      {
        date: '2016-05-27T18:52:53.113Z',
        offset: 3 * 3600 * 1000,
        groupSize: 2 * 60 * 1000,
        result: '2152'
      },
      {
        date: '2016-05-27T23:52:53.113Z',
        offset: 3 * 3600 * 1000,
        groupSize: 10 * 60 * 1000,
        result: '0250'
      },
      {
        date: '2016-05-27T01:52:53.113Z',
        offset: -1 * 3600 * 1000,
        groupSize: 5 * 60 * 1000,
        result: '0050'
      },
      {
        date: '2016-05-27T02:52:53.113Z',
        offset: -4 * 3600 * 1000,
        groupSize: 60 * 60 * 1000,
        result: '2200'
      }
    ];

    var testFn = function testFn(testCase) {
      var t = date.timeGroup(
        new Date(testCase.date).getTime(),
        testCase.groupSize,
        testCase.offset
      );
      expect(t).toBe(testCase.result);
    };
    cases.forEach(testFn);
  });
});

describe('roundDateToDay', function() {
  it('should round a time to a closed date', function() {
    var t = date.roundDateToDay(new Date('2016-05-27T18:52:53.113Z'));
    expect(new Date(t).toISOString()).toBe('2016-05-27T00:00:00.000Z');
  });
});

describe('createRelativeDayRange', function() {
  it('should return an interval', function() {

    var cases = [
      {
        offset: -3 * 3600 * 1000,
        time: new Date('Fri May 27 2016 11:52:53 GMT-0300'),
        start: -4,
        end: 2,
        days: [
          '20160523', '20160524', '20160525', '20160526',
          '20160527', '20160528', '20160529'],
        times: [
          '2016-05-23T03:00:00.000Z', '2016-05-24T03:00:00.000Z',
          '2016-05-25T03:00:00.000Z', '2016-05-26T03:00:00.000Z',
          '2016-05-27T03:00:00.000Z', '2016-05-28T03:00:00.000Z',
          '2016-05-29T03:00:00.000Z'
        ]
      },
      {
        offset: -3 * 3600 * 1000,
        time: new Date('Fri May 27 2016 01:25:33 GMT-0300').getTime(),
        start: -3,
        end: -1,
        days: ['20160524', '20160525', '20160526'],
        times: ['2016-05-24T03:00:00.000Z', '2016-05-25T03:00:00.000Z', '2016-05-26T03:00:00.000Z']
      },
      {
        offset: 6 * 3600 * 1000,
        time: new Date('Fri May 27 2016 00:00:00 GMT+0600').getTime(),
        start: -1,
        end: 1,
        days: ['20160526', '20160527', '20160528'],
        times: [
          '2016-05-25T18:00:00.000Z', '2016-05-26T18:00:00.000Z', '2016-05-27T18:00:00.000Z']
      },
      {
        offset: -6 * 3600 * 1000,
        time: new Date('Fri May 27 2016 11:25:33 GMT-0600').getTime(),
        start: 0,
        end: 0,
        days: ['20160527'],
        times: ['2016-05-27T06:00:00.000Z']
      },
      {
        offset: -6 * 3600 * 1000,
        time: new Date('Fri May 27 2016 11:25:33 GMT-0600').getTime(),
        start: 1,
        end: 0,
        days: [],
        times: []
      }
    ];

    var testFn = function testFn(testCase) {
      var results = date.createRelativeDayRange(
        testCase.time,
        testCase.start, testCase.end, testCase.offset);

      var days = results.map(function(r) { return r.day; });
      var times = results.map(function(r) { return new Date(r.time).toISOString(); });

      expect(days.join(',')).toBe(testCase.days.join(','));
      expect(times.join(',')).toBe(testCase.times.join(','));
    };

    cases.forEach(testFn);
  });
});

describe('Now & time freeze', function() {
  it('should fix the time to a moment and then came back', function() {
    var time1 = date.now();
    date.fixAt(timestamp);
    var time2 = date.now();
    date.reset();
    setTimeout(function() {
      var time3 = date.now();
      expect(time1).toBeLessThan(time3);
      expect(time2).toBe(timestamp);
      expect(time2).toBeLessThan(time1);
      expect(time2).toBeLessThan(time3);
    }, 10);
  });
});

describe('Keys', function() {

  it('should return the existing key periods', function() {
    expect(date.keyPeriods().join(',')).toBe([
      'all', 'year', 'month', 'day', 'week', 'weekday', 'schedule'
    ].join(','));
  });

  describe('keyForPeriod', function() {

    it('should return the valid formats for each period', function() {

      var time1 = timestamp;
      var time2 = new Date('2000-01-01T00:00:00.000Z').getTime();
      var time3 = new Date('1970-01-01T00:00:00.000Z').getTime();

      var tests = function(period, results) {
        var t = date.keyForPeriod(period, time1);
        expect(t).toBe(results[0]);
        t = date.keyForPeriod(period, time2);
        expect(t).toBe(results[1]);
        t = date.keyForPeriod(period, time2, -1);
        expect(t).toBe(results[2]);
        t = date.keyForPeriod(period, time3);
        expect(t).toBe(results[3]);
        t = date.keyForPeriod(period, time3, 50);
        expect(t).toBe(results[4]);
        t = date.keyForPeriod(period, time3, 100);
        expect(t).toBe(results[5]);
      };

      tests('all', ['a', 'a', 'a', 'a', 'a', 'a']);
      tests('year', ['16', '00', '99', '70', '20', '70']);
      tests('month', ['1605', '0001', '9912', '7001', '7403', '7805']);
      tests('day', ['160527', '000101', '991231', '700101', '700220', '700411']);
      tests('week', ['16022', '00001', '99052', '70001', '70051', '71049']);
      tests('weekday', ['5', '6', '5', '4', '5', '6']);
      tests('schedule', ['512', '600', '523', '400', '602', '104']);
    });

    it('should handle the error for an invalid key', function() {
      var handler = {error: function(err) {}};
      spyOn(handler, 'error');
      date.setErrorHandler(handler.error);

      var t = date.keyForPeriod('tomorrow', timestamp);
      expect(t).toBe('');
      expect(handler.error).toHaveBeenCalled();
    });
  });

  describe('keyFormat', function() {
    it('should return a formatted valid date from a key', function() {

      var tests = function(period, cases) {
        cases.forEach(function(c) {
          var t = date.keyFormat(period, c[0]);
          expect(t).toBe(c[1]);
        });
      };

      tests('all', [['a', 'all'], [null, 'all']]);
      tests('year', [['16', '2016'], ['00', '2000'], ['99', '2099']]);
      tests('month', [['1605', '2016-05'], ['0001', '2000-01'], ['9912', '2099-12']]);
      tests('day', [['160527', '2016-05-27'], ['000101', '2000-01-01'], ['991231', '2099-12-31']]);
      tests('week', [['16022', '2016-022'], ['00001', '2000-001'], ['99052', '2099-052']]);
      tests('weekday', [['0', '0'], ['6', '6']]);
      tests('schedule', [['512', '5-12'], ['600', '6-00'], ['104', '1-04']]);
    });

    it('should handle the error for an invalid key', function() {
      var handler = {error: function(err) {}};
      spyOn(handler, 'error');
      date.setErrorHandler(handler.error);

      var t = date.keyFormat('tomorrow', timestamp);
      expect(t).toBe('');
      expect(handler.error).toHaveBeenCalled();
    });
  });

});
