const fs = require('fs');

class Heap {
    constructor(max = 5) { this.data = []; this.max = max; }
    push(val) {
        if(this.data.length < this.max) {
            this.data.push(val);
            this.bubbleUp();
        } else if(this.data[0] < val) {
            this.data[0] = val;
            this.bubbleDown();
        }
        
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
    peek() {return this.data[0] ?? null}
}

function solution(isTest = false, inputStr = "") {
    const BUF_SIZE = 64 * 1024;
    const buf = Buffer.alloc(BUF_SIZE);
    let bytesRead = 0;
    let pos = 0;

    let testBuffer = isTest ? Buffer.from(inputStr): null;
    let testPos = 0;
    function next() {
        let res = 0;
        let sign = 1;
        let started = false;

        while (true) {
            if (pos >= bytesRead) {
                if (isTest) {
                    // 테스트 모드: 문자열 버퍼에서 읽기
                    const slice = testBuffer.slice(testPos, testPos + BUF_SIZE);
                    slice.copy(buf);
                    bytesRead = slice.length;
                    testPos += bytesRead;
                } else {
                    // 실제 제출 모드: 표준 입력에서 읽기
                    bytesRead = fs.readSync(0, buf, 0, BUF_SIZE);
                }
                pos = 0;
                if (bytesRead === 0) return started ? res * sign : null;
            }

            const byte = buf[pos++];
            if (byte === 45) { // '-'
                sign = -1;
                started = true;
            } else if (byte >= 48 && byte <= 57) { // '0'-'9'
                res = res * 10 + (byte - 48);
                started = true;
            } else if (started) {
                return res * sign;
            }
        }
    }
     
    const N = Number(next());
    
    const heap = new Heap(N);
    for(let i = 0; i < N * N; i++) {
        const item = Number(next());
        heap.push(item)
    }
    return "" + heap.peek();
}

// const inputStr = "5\n12 7 9 15 5\n13 8 11 19 6\n21 10 26 31 16\n48 14 28 35 25\n52 20 32 41 49";
// process.stdout.write(solution(true, inputStr));

process.stdout.write(solution());