class Heap {
    constructor(cond = (a,b) => a < b) {this.data=[];this.cond=cond}
    push(val) {
        this.data.push(val);
        this.bubbleUp();
    }
    pop() {
        if(this.data.length === 0) return null;
        if(this.data.length === 1) return this.data.pop();
        const top = this.data[0];
        this.data[0] = this.data.pop();
        this.bubbleDown();
        return top;
    }
    bubbleUp() {
        let index = this.data.length - 1;
        while(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.cond(this.data[parentIndex], this.data[index])) break;
            this._swap(parentIndex, index);
            index = parentIndex;
        }
    }
    bubbleDown() {
        const N = this.data.length;
        let index = 0;
        while(true) {
            const leftIndex = index * 2 + 1;
            const rightIndex = index * 2 + 2;
            let swapIndex = index;
            if(leftIndex < N && !this.cond(this.data[swapIndex], this.data[leftIndex])) swapIndex = leftIndex;
            if(rightIndex < N && !this.cond(this.data[swapIndex], this.data[rightIndex])) swapIndex = rightIndex;
            if(index === swapIndex) break;
            this._swap(index, swapIndex);
            index = swapIndex;
        }
    }
    _swap(a, b) {
        [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
    }
    peek() {
        return this.data[0] ?? null;
    }
    size() {return this.data.length}
}

function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next  = () => scanner.next().value[0];
    const N = Number(next());
    const classes = [];
    for(let i = 0; i < N; i++) {
        const S =Number(next()), T = Number(next())
        classes.push([S, T]);
    }
    classes.sort((a,b) => a[0] - b[0])
    const heap = new Heap();
    for(let i = 0; i < N; i ++) {
        const [S, T] = classes[i];
        if(heap.size() > 0 && heap.peek() <= S) {
            heap.pop();
        }
        heap.push(T);
    }
    return heap.size();
}

// const inputStr = "3\n1 3\n2 4\n3 5";
// console.log(solution(inputStr))
const fs = require("fs");
const input = fs.readFileSync(0).toString().trim();
console.log(solution(input))