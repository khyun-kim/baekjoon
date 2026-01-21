class PriorityQueue {
    constructor() { this.heap = [] }
    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    pop() {
        if(this.heap.length === 0) return null;
        if(this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        while(true) {
            const leftIndex = index * 2 + 1;
            const rightIndex = index * 2 + 2;
            let swapIndex = null;
            if(leftIndex < this.heap.length) {
                if(this.heap[index] > this.heap[leftIndex]) swapIndex = leftIndex;
            }
            if(rightIndex < this.heap.length) {
                if(
                    (swapIndex === null && this.heap[index] > this.heap[rightIndex])
                    || (swapIndex !== null && this.heap[leftIndex] > this.heap[rightIndex])
                ) {
                        swapIndex = rightIndex
                }
            }

            if(swapIndex === null) break;

            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];

            index = swapIndex;
        }
    }
}

function solution(arr) {
    const q = new PriorityQueue();
    const answer = [];
    for(let i = 0; i < arr.length; i++) {
        const num = arr[i];
        if(num > 0) q.push(arr[i]);
        else answer.push(q.pop() ?? 0);
    }
    console.log(answer.join("\n"))
}
const fs = require('fs');
const inputs = fs.readFileSync(0).toString().trim().split('\n').map((v) => Number(v));

solution(inputs.slice(1));