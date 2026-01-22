function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];
    
    const N = Number(next());
    const map = Array.from({length: N}, () => Array(N).fill(-1));
    for(let i = 0; i < N; i++) {
        const line = next();
        for(let j = 0; j < N; j++) {
            if(line[j] === "1") map[i][j] = 0;
        }
    }

    let aptNum = 1;
    const result = [];
    for(let y = 0; y < N; y++) {
        for(let x = 0; x < N; x++) {
            if(map[y][x] === 0) {
                result.push(bfs([y, x], map, N, aptNum++))
            }
        }
    }
    process.stdout.write(result.length+"\n"+ result.sort((a,b) => a-b).join("\n"))
}
function bfs(node, map, N, num) {
    const [y, x] = node;
    const queue = [node];
    const dy = [1, -1, 0, 0];
    const dx = [0, 0, -1, 1];
    let count = 1;
    map[y][x] = num;
    while(queue.length > 0) {
        const [currY, currX] = queue.shift();

        for(let i = 0; i < 4; i++) {
            const ny = currY + dy[i];
            const nx = currX + dx[i];
            if(nx >= 0 && nx < N && ny >= 0 && ny < N) {
                if(map[ny][nx] === 0) {
                    map[ny][nx] = num;
                    queue.push([ny, nx]);
                    count++
                }
            }
        }

    }
    return count;
}

const input = "7\n0110100\n0110101\n1110101\n0000111\n0100000\n0111110\n0111000"

const fs = require('fs');
// const input = fs.readFileSync(0).toString()

solution(input);
