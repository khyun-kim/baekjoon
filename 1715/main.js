class Heap {
    constructor() { this.data = [] }
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
        return this.data[p] < this.data[c];
    }
    _swap(a, b) {
        [this.data[a], this.data[b]] = [this.data[b], this.data[a]]
    }
    size() {return this.data.length}
}

function solution(arr) {
    const heap = new Heap();
    for(const item of arr) heap.push(item);
    
    let sum = 0;
    while(heap.size() > 1) {
        const min1 = heap.pop();
        const min2 = heap.pop();
        const res = min1 + min2;
        sum += res;
        heap.push(res);
    }
    console.log(sum);
}

const fs = require('fs');
const inputs = fs.readFileSync(0).toString().trim().split('\n').map((v) => Number(v));

solution(inputs.slice(1));