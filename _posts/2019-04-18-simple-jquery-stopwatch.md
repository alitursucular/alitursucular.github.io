---
title: "Simple jQuery stopwatch"
date: 2019-04-18
tags: [JavaScript, jQuery, Date(), google fonts]
excerpt: "I decided to use JavaScript date function at the core of this project. The main logic is; once the start button is pressed, the date value of that moment is stored. Every 10 ms, this stored value is subtracted from the current date value."
---

Here is the [demo](https://alitursucular.github.io/simple-jquery-stopwatch-demo/) and [GitHub repository](https://github.com/alitursucular/simple-jquery-stopwatch-demo).

I would call this stopwatch example as oldies but goldies. I am seeing a similar demonstration on many portfolio pages and I also wanted make one. The coding was fun and a bit tricky. As I do in most of my projects, I began searching the net and analyzing different codes / web technologies. Although there are modern ways of doing such stopwatch, I sticked with jQuery since I wanted to include jQuery in my portfolio.

It is important to note that, I haven't used any plug and play libraries to make it. However, if this was a tiny part of a larger project, I would have seen no harm using so. (for time and resouce optimization)

As always, let's breakdown the code and dive into details:

```javascript
startTime = new Date();
```

I decided to use JavaScript date function at the core of this project. The main logic is; once the start button is pressed, the date value of that moment is stored. Every 10 ms, this stored value is subtracted from the current date value. Since the elapsed time is slowly increasing, we achieve a chronometer effect.

```javascript
var elapsedTime = new Date(new Date() - startTime - pauseDuration);
```

You may notice that there is another variable named _pauseDuration_. Once I was sure that this logic functions properly, it was time to add an extra functionality to the project.

As for extra functionalities, the user has options to start, pause and reset the stopwatch. Once the start button is clicked, button state changes and becomes a pause button. If user clicks pause, stopwatch stops, interval is cleared and pause time is saved incase user decides to resume later.

```javascript
pauseDuration += new Date() - pauseTime;
```

Date objects use a Unix Time Stamp, an integer value that is the number of milliseconds since 1 January 1970 UTC. There are simple methods to return hours, minutes and seconds of that integer (in our case the elapsed time):

```javascript
var hr = elapsedTime.getUTCHours();
var min = elapsedTime.getUTCMinutes();
var sec = elapsedTime.getUTCSeconds();
```

There is another important thing to mention. How does the stopwatch knows its state? In other words, how does it know whether it is running, paused or resetted? The answer is not only simple, but also very important. There is a boolean variable called _execution_. Everytime the user takes an action, execution variable is updated accordingly. Whole if/else structure is controlled that way.

```javascript
function start() {
  if (execution) {
    clearInterval(intervalSetup);
    pauseTime = new Date();
    execution = 0;
    $("#start-pause").text("START");
    $("#start-pause").css("color", "yellowgreen");
  } else {
    if (pauseTime === null) {
      startTime = new Date();
      intervalSetup = setInterval(count, 10);
      execution = 1;
      $("#start-pause").text("PAUSE");
      $("#start-pause").css("color", "darkorange");
    } else {
      pauseDuration += new Date() - pauseTime;
      intervalSetup = setInterval(count, 10);
      execution = 1;
      $("#start-pause").text("PAUSE");
      $("#start-pause").css("color", "darkorange");
    }
  }
}
```

There is also a reset button of the stopwatch. The following function basically resets to defaults:

```javascript
function reset() {
  clearInterval(intervalSetup);
  pauseDuration = 0;
  startTime = null;
  pauseTime = null;
  execution = 0;
  $("#stopwatch").text("00:00:00");
  $("#start-pause").text("START");
  $("#start-pause").css("color", "yellowgreen");
}
```

Notice that, while stopwatch is counting, there is always a leading zero for single digits. It is achieved by a function which, is also called on every interval. It compares the received number of digits to the notation for every value, (00:00:00) and adds a leading zero if necessary. Although it is not a must, I prefer to keep UI clean.

Lastly, I used monospaced (fixed-width) font for the sake of this project. Since each digit occupies the same amount of horizontal space, we achieved improved UI rather than a vibrating visual.

_Bonus: Stopwatch also starts/pauses with the space key on your keyboard._

Thanks for reading! I would be very pleased if you could share your thoughts.

Here is the [demo](https://alitursucular.github.io/simple-jquery-stopwatch-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/simple-jquery-stopwatch-demo) of the project.
