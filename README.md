# Date





* * *

### Date.validFormats() 

Returns an array of valid formats to be parsed

**Returns**: `Array`


### Date.timestampFromFormat(string, format) 

Obtains a timestamp from specific format dates

**Parameters**

**string**: , Obtains a timestamp from specific format dates

**format**: , Obtains a timestamp from specific format dates

**Returns**: `number`, the timestamp


### Date.timestampToFormat(date, format) 

Returns a formatted string from a timestamp or date

**Parameters**

**date**: , Returns a formatted string from a timestamp or date

**format**: , Returns a formatted string from a timestamp or date

**Returns**: `string`


### Date.toArray(date, padded) 

Returns an array of parts of date from a timestamp or date

**Parameters**

**date**: , Returns an array of parts of date from a timestamp or date

**padded**: , if padded strings must be returned

**Returns**: `array`


### Date.toString(time) 

Returns the default date format

**Parameters**

**time**: , Returns the default date format

**Returns**: `string`


### Date.tsFromIso8601(dateStr) 

Parses the default date format

**Parameters**

**dateStr**: , Parses the default date format

**Returns**: `number`


### Date.fromNum(num) 

Converts a day number to a date object

**Parameters**

**num**: , Converts a day number to a date object

**Returns**: `Date`


### Date.toNum(date) 

Converts a date to a day number

**Parameters**

**date**: , Converts a date to a day number

**Returns**: `number`


### Date.keyPeriods() 

Returns an array of valid periods

**Returns**: `Array`


### Date.keyForPeriod(period, time, delta) 

Obtains a key based on a period and a time

**Parameters**

**period**: , (a valid period)

**time**: , Obtains a key based on a period and a time

**delta**: , (an integer to modify the time according to period)

**Returns**: `String`, IMPORTANT: Only support keys after year 2000


### Date.keyFormat(period, key) 

Format a string to a valid date input from a key

**Parameters**

**period**: , Format a string to a valid date input from a key

**key**: , Format a string to a valid date input from a key

**Returns**: , String

 IMPORTANT: Only support keys after year 2000


### Date.hrWithOffset(date, offset) 

Returns the hour of a time with timezone offset

**Parameters**

**date**: , or timestamp

**offset**: , in milliseconds

**Returns**: `number`


### Date.timeGroup(time, groupSize, offset) 

Returns a key for grouping times with timezone offset

**Parameters**

**time**: , Returns a key for grouping times with timezone offset

**groupSize**: , Returns a key for grouping times with timezone offset

**offset**: , Returns a key for grouping times with timezone offset

**Returns**: `string`


### Date.roundDateToDay(date) 

Round a date to the start of that day and returns its timestamp

**Parameters**

**date**: , Round a date to the start of that day and returns its timestamp

**Returns**: `number`


### Date.createRelativeDayRange(time, startDelta, endDelta, timeOffset) 

Creates a range of days and times with a timezone offset

**Parameters**

**time**: , Creates a range of days and times with a timezone offset

**startDelta**: , Creates a range of days and times with a timezone offset

**endDelta**: , Creates a range of days and times with a timezone offset

**timeOffset**: , in milliseconds

**Returns**: `Array`


### Date.now() 

Returns the current time handled by the module

**Returns**: `number`


### Date.fixAt() 

Fixes the time at a specific moment

**Parameters**

**fixAt**: `number`, Fixes the time at a specific moment



### Date.reset() 

Resets the current time to default function



### Date.setErrorHandler(handler) 

sets the function to handle errors

**Parameters**

**handler**: , sets the function to handle errors




* * *










