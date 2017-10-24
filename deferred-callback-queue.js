/**
 * @author The TriSoft Team <info@trisoft.ro>
 * @link https://www.trisoft.ro/
 */

export default function DeferredCallbackQueue(interval, autostart) {
    this.queue = [];
    this.interval = undefined;

    this.start = function () {
        if (this.interval !== undefined) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.work, interval || 100);
    }.bind(this);

    this.now = function () {
        return (new Date()).getTime();
    }.bind(this);

    this.work = function () {
        var now = this.now(), c, call;
        for (c = 0; c < this.queue.length; c++) {
            call = this.queue[c];
            if (call.when < now) {
                this.removeCall(call.func);
                call.func();
            }
        }
    }.bind(this);

    this.stop = function () {
        if (this.interval) {
            clearInterval(this.interval);
            delete this.interval;
        }
    }.bind(this);

    this.addCall = function (func, delay) {
        var now = this.now();
        if (this.hasCall(func)) {
            this.updateCall(func, now + delay);
            return;
        }

        this.queue.push({
            func: func,
            delay: delay,
            addedAt: now,
            when: now + delay
        });
    }.bind(this);

    this.updateCall = function (func, newWhen) {
        var c;
        for (c = 0; c < this.queue.length; c++) {
            if (this.queue[c].func === func) {
                this.queue[c].when = newWhen;
                return;
            }
        }
    }.bind(this);

    this.removeCall = function (func) {
        if (this.queue.length === 0) {
            return;
        }
        var idx = -1, c;
        for (c = 0; c < this.queue.length; c++) {
            if (this.queue[c].func === func) {
                idx = c;
                break;
            }
        }
        if (idx !== -1) {
            this.queue = this
                .queue
                .slice(0, idx)
                .concat(
                    this
                        .queue
                        .slice(idx + 1, this.queue.length - 1)
                )
            ;
        }
    }.bind(this);

    this.hasCall = function (func) {
        return this.getCall(func) !== undefined;
    }.bind(this);

    this.getCall = function (func) {
        var c;
        for (c = 0; c < this.queue.length; c++) {
            if (this.queue[c].func === func) {
                return this.queue[c];
            }
        }
    }.bind(this);

    if (autostart === true) {
        this.start();
    }
}
