class Deque {
    constructor(size) {
        this.capacity = size + 1;
        this.data = new Int32Array(this.capacity);
        this.head = 0;
        this.tail = 0;
    }
    pushBack(value) {
        this.data[this.tail] = value;
        this.tail = (this.tail + 1) % this.capacity;
    }
    pushFront(value) {
        this.head = (this.head - 1 + this.capacity) % this.capacity;
        this.data[this.head] = value;
    }
    popBack() {
            this.tail = (this.tail - 1 + this.capacity) % this.capacity;
        return this.data[this.tail];
    }
    popFront() {
        const value = this.data[this.head];
        this.head = (this.head + 1) % this.capacity;
        return value;
    }
    peekFront() {
        return this.data[this.head];
    }
    peekBack() {
        return this.data[(this.tail - 1 + this.capacity) % this.capacity];
    }
    size() {
        return (this.tail - this.head + this.capacity) % this.capacity;
    }
    isEmpty() {
        return this.tail === this.head;
    }
}



function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];
    const N = Number(next());
    const L = Number(next());
    const A = new Int32Array(N);
    const dq = new Deque(N);
    const result = [];

    for (let i = 0; i < N; i++) {
        const current = Number(next());
        A[i] = current;
        while (!dq.isEmpty() && A[dq.peekBack()] >= current) {
            dq.popBack();
        }
        dq.pushBack(i);
        // [핵심] 윈도우 범위를 벗어난 인덱스 제거
        if (dq.peekFront() <= i - L) {
            dq.popFront();
        }

        // 최솟값 가져오기 (덱의 맨 앞)
        const minVal = A[dq.peekFront()];

        const s = minVal.toString();
        result.push(s)
    }
    process.stdout.write(result.join(" "));
    
}
// const inputStr = "12 3\n1 5 2 3 6 2 3 7 3 5 2 6";
// solution(inputStr)

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim();
solution(input)