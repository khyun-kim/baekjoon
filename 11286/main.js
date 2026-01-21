class Heap {
    constructor() { this.data = [] }
    size() { return this.data.length }
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
            if(leftIndex < n && !this.condition(index, leftIndex)) swapIndex = leftIndex;
            if(rightIndex < n && !this.condition(swapIndex, rightIndex)) swapIndex = rightIndex;
            if(swapIndex === index) break;
            this._swap(index, swapIndex);
            index = swapIndex;
        }
    }
    condition(p, c) {
        const abs_p = Math.abs(this.data[p]); 
        const abs_c = Math.abs(this.data[c])
        if(abs_p < abs_c) return true;
        return abs_p === abs_c && this.data[p] < this.data[c];
    }
    _swap(a,b) {
        [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
    }
}

function solution(arr) {
    const q = new Heap();
    const answer = [];
    for(let i = 0; i < arr.length; i++) {
        const num = arr[i];
        if(num !== 0) q.push(arr[i]);
        else answer.push(q.pop() ?? 0);
    }
    console.log(answer.join("\n"))
}

const fs = require('fs');
const inputs = fs.readFileSync(0).toString().trim().split('\n').map((v) => Number(v));

solution(inputs.slice(1));