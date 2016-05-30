# Date





* * *

### Date.validFormats() 

Returns an array of valid formats to be parsed

**Returns**: `Array`, a list of valid formats


### Date.timestampFromFormat(string, format) 

Obtains a timestamp from specific format dates

**Parameters**

**string**: `String`, the date in a specific format

**format**: `String`, the format(s) to evaluate

**Returns**: `Number`, the resulting timestamp


### Date.timestampToFormat(date, format) 

Returns a formatted string from a timestamp or date

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**format**: `String`, the format to use

**Returns**: `String`, the string representing the date


### Date.toArray(date, padded) 

Returns an array of parts of date from a timestamp or date

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**padded**: `boolean`, if padded strings must be returned

**Returns**: `array`, the date elements


### Date.toString(date) 

Returns the default date format

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**Returns**: `String`, the formatted date


### Date.tsFromIso8601(dateStr) 

Parses the default date format

**Parameters**

**dateStr**: `String`, the string with the represented date

**Returns**: `Number`, the timestamp


### Date.fromNum(num) 

Converts a day number to a date object

**Parameters**

**num**: `Number`, the day as a number yyyymmdd

**Returns**: `Date`, the corresponding date


### Date.toNum(date) 

Converts a date to a day number

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**Returns**: `Number`, the date as yyyymmdd number


### Date.keyPeriods() 

Returns an array of valid periods

**Returns**: `Array`, a list of valid key periods


### Date.keyForPeriod(period, time, delta) 

Obtains a key based on a period and a time

**Parameters**

**period**: `String`, a valid period

**time**: `Number`, the timestamp

**delta**: `Number`, an integer to modify the time according to period

**Returns**: `String`, the corresponding key

 IMPORTANT: Only support keys after year 2000


### Date.keyFormat(period, key) 

Format a string to a valid date input from a key

**Parameters**

**period**: `String`, a valid period

**key**: `String`, the key of the period

**Returns**: `String`, the formatted key

 IMPORTANT: Only support keys after year 2000


### Date.hrWithOffset(date, offset) 

Returns the hour of a time with timezone offset

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**offset**: , in milliseconds

**Returns**: `Number`


### Date.timeGroup(date, groupSize, offset) 

Returns a key for grouping times with timezone offset

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**groupSize**: `Number`, Returns a key for grouping times with timezone offset

**offset**: `Number`, Returns a key for grouping times with timezone offset

**Returns**: `String`, the grouping key


### Date.roundDateToDay(date) 

Round a date to the start of that day and returns its timestamp

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**Returns**: `Number`, the rounded day


### Date.createRelativeDayRange(date, startDelta, endDelta, timeOffset) 

Creates a range of days and times with a timezone offset

**Parameters**

**date**: `Number | Date`, the timestamp or date object

**startDelta**: `Number`, the delta for the start point in the specified units

**endDelta**: `Number`, the delta for the end point in the specified units

**timeOffset**: `Number`, the time offset in milliseconds

**Returns**: `Array`, the objects with the day in yyyymmdd and the timestamp


### Date.now() 

Returns the current time handled by the module

**Returns**: `Number`, the current timestamp


### Date.fixAt(timestamp) 

Fixes the time at a specific moment

**Parameters**

**timestamp**: `Number`, the timestamp to use



### Date.reset() 

Resets the current time to default function



### Date.setErrorHandler(handler) 

sets the function to handle errors

**Parameters**

**handler**: `function`, the function that will handle the error




* * *










