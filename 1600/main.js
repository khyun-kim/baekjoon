
function solution(input = '') {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];


    const K = Number(next());
    const W = Number(next());
    const H = Number(next());

    const ground = Array.from({length: H}, () => Array(W).fill(1));
    
    for(let y = 0; y < H; y++) {
        for(let x = 0; x < W; x++) {
            ground[y][x] = Number(next());
        }
    }

    const visited = Array.from({length: H}, () => Array.from({length: W}, () => Array(K + 1).fill(false)));
    const start= [0, 0];
    const dist = [H - 1, W - 1]

    const result = bfs(start, dist, ground, visited, W, H, K);
    
    process.stdout.write(result.toString());
}

function bfs(node, dist, ground, visited, W, H, K) {
    const dyHorse = [-2, -2, -1, 1, 2, 2, 1, -1];
    const dxHorse = [-1, 1, 2, 2, 1, -1, -2, -2];
    const dy = [1, -1, 0, 0];
    const dx = [0, 0, -1, 1];

    const [startY, startX] = node;
    const [distY, distX] = dist;

    if (startY === distY && startX === distX) return 0;

    let head = 0;
    // y, x, k, moved
    const queue = [[startY, startX, 0, 0]];
    visited[startY][startX][0] = true;

    while(queue.length > head) {
        const curr = queue[head++];
        const [y, x, horse, moved] = curr;

        if(y === distY && x === distX) {
            return moved;
        }

        // 말 이동하기
        if(horse < K) {
            for(let i = 0; i < 8 ; i++) {
                const ny = y + dyHorse[i];
                const nx = x + dxHorse[i];
                if(nx >= 0 && nx < W && ny >= 0 && ny < H) {
                    if(ground[ny][nx] === 0 && visited[ny][nx][horse + 1] === false) {
                        if (ny === distY && nx === distX) return moved + 1;
                        queue.push([ny, nx, horse + 1, moved + 1]);
                        visited[ny][nx][horse + 1] = true;
                    }
                }
            }
        }
        // 도보 이동하기
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            if(nx >= 0 && nx < W && ny >= 0 && ny < H) {
                if(ground[ny][nx] === 0 && visited[ny][nx][horse] === false) {
                    if (ny === distY && nx === distX) return moved + 1;
                    queue.push([ny, nx, horse, moved + 1]);
                    visited[ny][nx][horse] = true;
                }
            }
        }
    }
    return -1;
}

const fs = require('fs');

// const input = "1\n4 4\n0 0 0 0\n1 0 0 0\n0 0 1 0\n0 1 0 0";
const input = fs.readFileSync(0).toString();

solution(input);