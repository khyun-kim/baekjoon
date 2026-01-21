class MaxHeap {
    constructor() { this.heap = [] }
    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    pop() {
        if(this.heap.length <= 1) return this.heap.pop() ?? null;
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return top;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.condition(this.heap[parentIndex], this.heap[index])) break;

            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];

            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        const n = this.heap.length;
        while(true) {
            const leftIndex = index * 2 + 1;
            const rightIndex = index * 2 + 2;
            let swapIndex = index;
            if(leftIndex < n && !this.condition(this.heap[index], this.heap[leftIndex])) {
                swapIndex = leftIndex;
            }
            if(rightIndex < n && !this.condition(this.heap[swapIndex], this.heap[rightIndex])) {
                swapIndex = rightIndex
            }
            if(swapIndex === index) break;

            [this.heap[swapIndex], this.heap[index]] = [this.heap[index], this.heap[swapIndex]];
            index = swapIndex;
        }
    }
    condition(p, c) {
        return p >= c;
    }
    size() { return this.heap.length }
}


function solution(arr) {
    const heap = new MaxHeap();
    const result = [];
    for(const item of arr) {
        if(item === 0) result.push(heap.pop() ?? 0);
        else heap.push(item); 
    }
    console.log(result.join("\n"))
}


const fs = require('fs');
const inputs = fs.readFileSync(0).toString().trim().split('\n').map((v) => Number(v));

solution(inputs.slice(1));


