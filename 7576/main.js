function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];
    const startNodes = [];

    const X = Number(next());
    const Y = Number(next());
    const box = Array.from({length: Y}, () => Array(X).fill(-1));
    let unripeCount = 0;
    for(let i = 0; i < Y; i++) {
        for(let j = 0; j < X; j++) {
            box[i][j] = Number(next());
            if(box[i][j] === 0) unripeCount++;
            if(box[i][j] === 1) startNodes.push([i, j]);
        }
    }

    if(unripeCount === 0) return process.stdout.write("0");

    const [result, unriped] = bfs(box, startNodes, X, Y, unripeCount);
    if(unriped > 0) process.stdout.write("-1");
    else process.stdout.write(result.toString());
}
function bfs(box, nodes, W, H, unripeCount) {
    
    const queue = [nodes];
    const dy = [1, -1, 0, 0];
    const dx = [0, 0, -1, 1]
    let day = 0;
    while(queue.length > 0) {
        const curr = queue.shift();
        const nextNodes = [];
        for(const node of curr) {
            const [y, x] = node;
            for(let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];
                if(ny >= 0 && ny < H && nx >= 0 && nx < W) {
                    if(box[ny][nx] === 0) {
                        box[ny][nx] = 1;
                        nextNodes.push([ny, nx]);
                        unripeCount--;
                    }
                }
            }
        }
        if(nextNodes.length > 0) {
            queue.push(nextNodes);
            day++;
        }
    }
    return [day, unripeCount];
}

// const input = "6 4\n0 0 0 0 0 0\n0 0 0 0 0 0\n0 0 0 0 0 0\n0 0 0 0 0 1";
// const input = "2 2\n0 -1\n-1 1";
// const input = "2 2\n1 -1\n-1 1";

const fs = require('fs');
const input = fs.readFileSync(0).toString();

solution(input)