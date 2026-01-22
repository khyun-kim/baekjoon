function solution(input = "") {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];

    if(input.length === 0) throw new Error("Invalid Input");

    const M = Number(next()); // 가로
    const N = Number(next()); // 세로
    const H = Number(next()); // 높이
    const boxes = Array.from({length: H}, () => Array.from({length: N}, () => Array(M).fill(-1)));
    const startNodes = [];
    let unriped = 0;
    for(let z = 0; z < H; z++) {
        for(let y = 0; y < N; y++) {
            for(let x = 0; x < M; x++) {
                boxes[z][y][x] = Number(next());
                if(boxes[z][y][x] === 1) startNodes.push([z, y, x]);
                if(boxes[z][y][x] === 0) unriped++;
            }
        }
    }
    if(unriped === 0) return process.stdout.write("0")
    const [res, unrip] = bfs(startNodes, boxes, M, N, H, unriped);
    if(unrip > 0) return process.stdout.write("-1")
    process.stdout.write(res.toString())
}

function bfs(nodes, boxes, X, Y, Z, unriped) {
    let day = 0
    let head = 0;
    // 상 하 좌 우 위 아래
    const dz = [0, 0, 0, 0, 1, -1];
    const dy = [1, -1, 0, 0, 0, 0];
    const dx = [0, 0, -1, 1, 0, 0];
    const queue = [nodes];
    while(head < queue.length) {
        const curr = queue[head++];
        const nextNodes = [];
        for(const node of curr) {
            const [z, y, x] = node;
            for(let i = 0; i < 6; i++) {
                const nz = z + dz[i];
                const ny = y + dy[i];
                const nx = x + dx[i];
                if(nz >= 0 && nz < Z && ny >= 0 && ny < Y && nx >= 0 && nx < X) {
                    if(boxes[nz][ny][nx] === 0) {
                        boxes[nz][ny][nx] = 1;
                        nextNodes.push([nz, ny, nx]);
                        unriped--;
                    }
                }
            }
        }
        if(nextNodes.length > 0) {
            day++;
            queue.push(nextNodes);
        }
    }

    return [day, unriped];
}

// const input = "5 3 1\n0 -1 0 0 0\n-1 -1 0 1 1\n0 0 0 1 1";
// const input = "5 3 2\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 1 0 0\n0 0 0 0 0";
const fs = require('fs');
const input = fs.readFileSync(0).toString();

solution(input);