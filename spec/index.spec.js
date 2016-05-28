"use strict";

var date = require('../');
var timestamp = 1464350400000;

describe('timestampFromFormat & error handler', function() {
  it('should return valid formats for dates', function() {

    // Size 12
    var a = date.timestampFromFormat('160527120000');
    expect(a).toBe(timestamp);

    // Size 17
    var b = date.timestampFromFormat('05272016120000000');
    expect(b).toBe(timestamp);

    // mdyhis
    var c = date.timestampFromFormat('052716120000', 'mdyhis');
    expect(c).toBe(timestamp);

  });

  it('should call handler error with invalid format date', function() {

    var handler = {error: function(err) {}};
    spyOn(handler, 'error');
    date.setErrorHandler(handler.error);

    date.timestampFromFormat('052716120000', 'mydhis');
    expect(handler.error).toHaveBeenCalled();

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


describe('yyyymmdd', function() {
  it('should return a valid formatted string from a date object', function() {
    var t1 = date.yyyymmdd(new Date(timestamp));
    expect(t1).toBe('20160527');
    var t2 = date.yyyymmdd(new Date(timestamp), '*');
    expect(t2).toBe('2016*05*27');
  });

  it('should return a valid formatted string from a timestamp', function() {
    var t1 = date.yyyymmdd(timestamp);
    expect(t1).toBe('20160527');
    var t2 = date.yyyymmdd(timestamp, '*');
    expect(t2).toBe('2016*05*27');
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
