# The sun is rising in Japan, where as it's setting in America. 

As a developer we should take care of user's timezone.

Its necessary to shift from global timezone to our local server's timezone. As a result, there will be a concept of offset. Offset is a number of minutes to be added to shift from global time to our local server's timezone.

Let's take an example of getting an offset in moment js.

`console.log(moment().utcOffset());`

This method will return the offset it needs to shift to our time.

# What is timestamps?

* In order to work with dates more easily, we can represent dates as numbers.
* the common epoch has already been set and its value is January 1, 1970 (midnight UTC).


# What is UTC+5:30?

UTC+5:30 timezone is used by India and SriLanka. That means it is ahead of 5 hours and 30 minutes ahead of coordinated universal time.


