function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];
    
    const T = Number(next());
    const result = [];
    for(let i = 0; i < T; i++) {
        const M = Number(next());
        const N = Number(next());
        const map = Array.from({length: N}, () => Array(M).fill(0));
        const K = Number(next());
        for(let j = 0; j < K; j++) {
            const X = Number(next());
            const Y = Number(next());
            map[Y][X] = 1;
        }
        let val = 0;
        for(let y = 0; y < N; y++) {
            for(let x = 0; x < M; x++) {
                if(map[y][x] === 1) {
                    bfs([y, x], map, M, N);
                    val++;
                }
            }
        }
        result.push(val);
    }
    process.stdout.write(result.join("\n"))
}


function bfs(node, map, W, H) {
    const [y, x] = node;
    const queue = [node];
    const dy = [1, -1, 0, 0];
    const dx = [0, 0, -1, 1];
    map[y][x] = 2;
    while(queue.length > 0) {
        const [currY, currX] = queue.shift();
        for(let i = 0; i < 4; i++) {
            const ny = currY + dy[i];
            const nx = currX + dx[i];
            if(ny >= 0 && ny < H && nx >= 0 && nx < W) {
                if(map[ny][nx] === 1) {
                    map[ny][nx] = 2;
                    queue.push([ny, nx]);
                }
            }
        }
    }
}

// const input = "2\n10 8 17\n0 0\n1 0\n1 1\n4 2\n4 3\n4 5\n2 4\n3 4\n7 4\n8 4\n9 4\n7 5\n8 5\n9 5\n7 6\n8 6\n9 6\n10 10 1\n5 5";

const fs = require('fs');
const input = fs.readFileSync(0).toString();

solution(input);