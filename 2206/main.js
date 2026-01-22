function solution(input = "") {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];
    if(input.length === 0) throw new Error("Invalid Input");
    const N = Number(next());
    const M = Number(next());
    const maze = Array.from({length: N}, () => Array(M).fill("1"));

    for(let y = 0; y < N; y++) {
        const line = next();
        for(let x = 0; x < M; x++) {
            maze[y][x] = line[x];
        }
    }
    
    const node = [0, 0];
    const dist = [N-1, M-1];
    const visited = Array.from({length: N}, () => Array.from({length:M}, () => [false, false]));
    const result = bfs(node, dist, maze, M, N,visited);
    
    if(result === Infinity) console.log("-1");
    else console.log(result);
}

function bfs(start, dist, maze, X, Y, visited) {
    const [sy,sx] = start;
    const [distY, distX] = dist;
    let head = 0;
    const queue = [[sy, sx, 0, 1]];
    const dy = [1, -1, 0, 0];
    const dx = [0, 0, -1, 1];

    let min = Infinity;

    while(head < queue.length) {
        const curr = queue[head++];
        const [y, x, broken, moved] = curr;
        if(distY === y && distX === x) {
            min = Math.min(min, moved);
        }
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            if(ny >= 0 && ny < Y && nx >= 0 && nx < X) {
                const slot = maze[ny][nx];
                if(slot === "0" && visited[ny][nx][broken] === false) {
                    visited[ny][nx][broken] = true;
                    queue.push([ny, nx, broken, moved + 1]);
                } else if(slot === "1" && broken === 0) {
                    visited[ny][nx][1] = true;
                    queue.push([ny, nx, 1, moved + 1]);
                }
            }
        }
    }

    return min;
}

// const input = "6 4\n0100\n1110\n1000\n0000\n0111\n0000";
// const input = "4 4\n0111\n1111\n1111\n1110";
// const input = "4 4\n0111\n0111\n0111\n0010";
const fs = require('fs');
const input = fs.readFileSync(0).toString();

solution(input);