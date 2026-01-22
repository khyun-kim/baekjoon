class Heap {
    constructor(condition = (a, b) => a < b) { this.data = []; this._cond = condition}
    push(val) {
        this.data.push(val);
        this.bubbleUp();
    }
    pop() {
        if(this.data.length <= 1) return this.data.pop() ?? null;
        const top = this.data[0];
        this.data[0] = this.data.pop();
        this.bubbleDown();
        return top;
    }
    bubbleUp() {
        let index = this.data.length - 1;
        while(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.condition(parentIndex, index)) break;
            this._swap(parentIndex, index);
            index = parentIndex;
        }
    }
    bubbleDown() {
        const n = this.data.length;
        let index = 0;
        while(true) {
            const leftIndex = index * 2 + 1;
            const rightIndex = index * 2 + 2;
            let swapIndex = index;
            if(leftIndex < n && !this.condition(swapIndex, leftIndex)) swapIndex = leftIndex;
            if(rightIndex < n && !this.condition(swapIndex, rightIndex)) swapIndex = rightIndex;
            if(swapIndex === index) break;
            this._swap(index, swapIndex);
            index = swapIndex;
        }
    }
    condition(p, c) {
        return this._cond(this.data[p], this.data[c]);
    }
    _swap(a, b) {
        [this.data[a], this.data[b]] = [this.data[b], this.data[a]]
    }
    size() {return this.data.length}
    peek() {return this.data[0] ?? Infinity}
}

function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];
    const n = BigInt(next());
    const m = BigInt(next());
    const heap = new Heap();

    for(let i = 0; i < n; i++) {
        heap.push(BigInt(next()));
    }

    for(let i = 0; i < m; i++) {
        const x = heap.pop();
        const y = heap.pop();
        const sum = x + y;
        heap.push(sum);
        heap.push(sum);
    }

    const result = heap.data.reduce((acc,val) => acc + val);

    console.log(result.toString())
}

// const input = "3 1\n3 2 6"
// solution(input);
const fs = require('fs');
const input = fs.readFileSync(0).toString();
solution(input);
