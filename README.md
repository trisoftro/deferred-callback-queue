# Deferred Callback Queue

Simple method to defer and throttle the execution of method calls.

# Properties

- `queue`
    - contains an array of call hashes
- `interval`
    - the interval id

# Methods

- `start()`
    - starts the interval with the `work` function as callback
- `work()`
    - loops over the queue array
    - it will execute the callbacks that are due
    - it will remove the callbacks after execution
- `removeCall(callback)`
    - removes a callback if present in the queue
- `hasCall(callback);`
    - check if a call is queued
    - returns true/false
- `addCall(callback, delay)`:
    - adds a callback to the queue
    - if the callback is already queue, it simply defers it further by calling `updateCall(callback, delay)`
    - delay must be an int and represents the number of miliseconds from now untill the execution
- `getCall(callback)`
    - returns undefined if not in queue or a hash with the following keys: func, delay, addedAt and when
- `updateCall(callback, delay)`
    - delay must be an int and represents the number of miliseconds from now untill the execution

# Usage

```javascript
// include the <script>
/**
 * Initialize the queue, with an interval of 100 miliseconds and autostart set to true.
 * If autostart is false or not specified, you must call queue.start(); yourself.
 */
var queue = new DeferredCallbackQueue(100, true);

$('.something').click(function () {
    /**
     * Clicking this function will queue the Do.Something method to be executed
     * at least 1024 miliseconds after the click.
     * If in this interval, you click the function again, it will only defer the
     * execution a bit more but not queue it again.
     * This is usefull for example when you want to save the data from a form in
     * the server side session.
     * NB: This won't work with anonymous functions, as they will always appear
     * to be unique functions
     */
    queue.addCall(Do.Something, 1024);
});
```
