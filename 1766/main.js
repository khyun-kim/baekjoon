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

function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];

    const N = Number(next());
    const M = Number(next());

    // 하나의 문제를 풀기위해 여러 문제가 필요할 수 있음
    const adj = Array.from({ length: N + 1 }, () => []);
    const indegree = new Int32Array(N + 1);

    for(let i = 0; i < M; i++) {
        const a = Number(next()); // a는 b를 보다 먼저 푸는 것이 좋음
        const b =  Number(next()); // 즉 a 풀면 b 해금
        adj[a].push(b);
        indegree[b]++; // b 못푸는 이유 증가
    }

    const heap = new Heap();
    for(let i = 1; i <= N; i++) {
        if(indegree[i] === 0) heap.push(i);
    }
    const result = []
    while(heap.size() > 0) {
        const curr = heap.pop();
        result.push(curr);

        for (const nextProblem of adj[curr]) {
            indegree[nextProblem]--;
            if (indegree[nextProblem] === 0) {
                heap.push(nextProblem);
            }
        }
    }

    return result
}


// const inputStr = "4 2\n4 2\n3 1";
// process.stdout.write(solution(inputStr).join(" "));

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim()
process.stdout.write(solution(input).join(" "))