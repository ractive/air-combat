interface Execution {
    id: number;
    t: number;
    interval: number;
    f: () => void;
}

class Interval {
    private static createHeap() {
        return new Heap((a: Execution, b: Execution) => a.t - b.t);
    }

    private id: number = 0;
    private nextExecutionHeap = Interval.createHeap();

    constructor() {
        game.onUpdate(() => {
            while (this.nextExecutionHeap.length && this.nextExecutionHeap.peek().t <= game.runtime()) {
                const execution = this.nextExecutionHeap.pop();
                // execute and...
                execution.f();
                // schedule the next execution
                execution.t = game.runtime() + execution.interval;
                this.nextExecutionHeap.push(execution);
            }
        });
    }

    public on(interval: number, f: () => void): () => void {
        const id = this.id++;
        this.nextExecutionHeap.push({id, t: game.runtime() + interval, interval, f});
        return () => {
            const newHeap = Interval.createHeap();
            while (this.nextExecutionHeap.length()) {
                const execution = this.nextExecutionHeap.pop();
                if (execution.id !== id) {
                    newHeap.push(execution);
                }
            }
            this.nextExecutionHeap = newHeap;
        };
    }
}
