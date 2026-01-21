
class Heap {
    constructor(_cond = (a, b) => a < b) {this.data = [];this.cond = _cond}
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
            if(this.cond(this.data[parentIndex], this.data[index])) break;
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
            if(leftIndex < n && !this.cond(this.data[swapIndex], this.data[leftIndex])) swapIndex = leftIndex;
            if(rightIndex < n && !this.cond(this.data[swapIndex], this.data[rightIndex])) swapIndex = rightIndex;
            if(index === swapIndex) break;
            this._swap(index, swapIndex);
            index = swapIndex;
        }
    }
    size() {return this.data.length}
    _swap(p, c) {
        [this.data[p], this.data[c]] = [this.data[c], this.data[p]];
    }
    peek() { return this.data[0] }
    clear() {this.data.length = 0}
}

const deletedIds = new Uint8Array(1000001).fill(0);
class DuelHeap {
    constructor() {
        this.maxHeap = new Heap((a, b) => a[1] > b[1]);
        this.minHeap = new Heap((a, b) => a[1] < b[1]);
        this.indexer = 0;
        this.length = 0;
    }
    size() {
        return this.length;
    }
    push(val) {
        const item = [this.indexer++, val];
        this.maxHeap.push(item);
        this.minHeap.push(item);
        this.length++;
    }
    pop(max = false) {
        const item = this._cleanHeap(max ? this.maxHeap : this.minHeap);
        if(!item) return null;
        deletedIds[item[0]] = 1;
        this.length--;
        return item[1];
    }

    _cleanHeap(heap) {
        while(heap.size() > 0 && deletedIds[heap.peek()[0]]) {
            heap.pop();
        }
        return heap.size() > 0 ? heap.pop() : null;
    }
    peek(max = true) {
        const heap = max ? this.maxHeap : this.minHeap;
        while(heap.size() > 0 && deletedIds[heap.peek()[0]]) {
            heap.pop();
        }
        return heap.peek()[1];
    }
    clear() {
        this.maxHeap.clear();
        this.minHeap.clear();
        this.indexer = 0;
        this.length = 0;
        deletedIds.fill(0);
    }
}


function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    function next() {
        return scanner.next().value[0]
    }

    let cursor = 0;
    const result = [];
    const T = Number(next());
    const heap = new DuelHeap();
    for(let t = 0; t < T; t++) {
        const K = Number(next());
        for(let i = 0; i < K; i++) {
            const command = next();
            const num = Number(next());
            
            if(command === "I") {
                heap.push(num);
            } else {
                if(heap.size() > 0) heap.pop(num === 1);
            }
        }

        if(heap.size() === 0) {
            result.push("EMPTY")
        } else {
            result.push(`${heap.peek(true)} ${heap.peek(false)}`);
        }

        heap.clear();
    }
    return result;
}


const fs = require('fs');
const inputs = fs.readFileSync(0).toString().trim();
process.stdout.write(solution(inputs).join("\n"));

// const inputStr = "3\n7\nI 16\nI -5643\nD -1\nD 1\nD 1\nI 123\nD -1\n9\nI -45\nI 653\nD 1\nI -642\nI 45\nI 97\nD 1\nD -1\nI 333\n9\nI -45\nI 653\nD 1\nI -642\nI 45\nI 97\nD 1\nD -1\nI 333"
// process.stdout.write(solution(inputStr).join("\n"));
