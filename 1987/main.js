function solution(input = "") {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];

    const R = Number(next());
    const C = Number(next());
    const board = [];
    for(let y = 0; y < R; y++) {
        const row = [];
        const item  = next();
        for(let x = 0; x < C; x++) {
            row.push(item[x]);
        }
        board.push(row);
    }  
    let max = 0
    function dfs(node, board, R, C, count, visited = new Uint16Array(26).fill(0)) {
        max = Math.max(count, max);
        const [y, x] = node;
        const dy = [1, -1, 0, 0];
        const dx = [0, 0, -1, 1];
        visited[board[y][x].charCodeAt() - 65] = 1;
        
        for(let i = 0; i < 4; i++) {
            const ny = dy[i] + y;
            const nx = dx[i] + x;
            if(nx >= 0 && nx < C && ny >= 0 && ny < R) {
                // 유효한 좌표
                const char = board[ny][nx];
                const idx =char.charCodeAt() - 65;
                // 접근 가능
                if(visited[idx] === 0) {
                    visited[idx] = 1;
                    dfs([ny, nx], board, R, C, count + 1, visited);
                    visited[idx] = 0;
                }
            }
        }
    }


    dfs([0, 0], board, R, C, 1);

    process.stdout.write(max.toString())
}


// const input = "2 4\nCAAB\nADCB"

const fs = require('fs');
const input = fs.readFileSync(0).toString();

solution(input);