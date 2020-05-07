namespace Interval {
    interface Execution {
        id: number;
        t: number;
        interval: number;
        f: () => void;
    }

    function createHeap() {
        return new Heap((a: Execution, b: Execution) => a.t - b.t);
    }

    let id: number = 0;
    let nextExecutionHeap: Heap<Execution> = undefined;

    function init() {
        if (nextExecutionHeap) {
            return;
        }

        nextExecutionHeap = createHeap();
        game.eventContext().registerFrameHandler(scene.UPDATE_INTERVAL_PRIORITY, () => {
            while (nextExecutionHeap.length && nextExecutionHeap.peek().t <= game.runtime()) {
                const execution = nextExecutionHeap.pop();
                // execute...
                execution.f();
                // ... and schedule the next execution
                execution.t = game.runtime() + execution.interval;
                nextExecutionHeap.push(execution);
            }
        });
    }

    /**
     * Registers the given callback function f to be executed every interval milliseconds.
     * Returns a function that can be called to unregister this interval handler.
     * 
     * ```
     * const remove = Interval.on(500, () => console.log("got called"));
     * ....
     * remove(); // unregisters the callback
     * ```
     * 
     * @param interval in milliseconds, when the given callback should be called
     * @return a function that can be called to unregister the handler
     */
    export function on(interval: number, f: () => void): () => void {
        init();

        nextExecutionHeap.push({id: id++, t: game.runtime() + interval, interval, f});

        // return a function that removes this callback
        return () => {
            const newHeap = createHeap();
            while (nextExecutionHeap.length()) {
                const execution = nextExecutionHeap.pop();
                if (execution.id !== id) {
                    newHeap.push(execution);
                }
            }
            nextExecutionHeap = newHeap;
        };
    }

}

