
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

/**
 * @param {Number} N
 * @param {Number} K
 * @param {[Number, Number][]} jewels 
 * @param {Number[]} capacities  
 */
function solution(N, K, jewels, capacities) {
    jewels.sort((a, b) => a[0] - b[0])
    capacities.sort((a, b) => a - b);
    const maxHeap = new Heap((a, b) => a > b);
    let totalValue = 0;
    let jewelIndex = 0;
    
    for(let k = 0; k < K; k++) {
        const capacity = capacities[k];
        while((jewelIndex < N) && (jewels[jewelIndex][0] <= capacity)) {
            maxHeap.push(jewels[jewelIndex][1]);
            jewelIndex++;
        }
        if(maxHeap.size() > 0) {
            totalValue += maxHeap.pop();
        }
    }
    
    return totalValue;
}

/**
 * @param {String} str 
 */
function parseInput(str) {
    const data = str.split("\n");
    const [N, K] = data[0].split(" ").map((v) => Number(v));
    const jewels = [];
    const capacities = []
    for(let i = 1; i <= N; i++) {
        jewels.push(data[i].split(" ").map((v) => Number(v)));
    }
    for(let i = 0; i < K; i++) {
        capacities.push(Number(data[i + N + 1]));
    }
    return [N, K, jewels, capacities]
}

const input1Str = "2 1\n5 10\n100 100\n11";
const input2Str = "3 2\n1 65\n5 23\n2 99\n10\n2"
// console.log(solution(...parseInput(input1Str)))
// console.log(solution(...parseInput(input2Str)))

const fs = require('fs');
const inputs = fs.readFileSync(0).toString().trim()

console.log(solution(...parseInput(inputs)))
