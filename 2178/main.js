function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];

    const N = Number(next());
    const M = Number(next());

    const maze = Array.from({length: N}, () => Array(M).fill(0));
    for(let n = 0; n < N; n++) {
        const row = next();
        for(let i = 0; i < row.length; i++) {
            if(row[i] === "1") {
                maze[n][i] = 1
            }
        }
    } 
    const result = bfs([0, 0],[N - 1, M - 1], maze, N, M);
    process.stdout.write(result.toString());
}
/**
 * @param node 현재 위치
 * @param dist 목적지
 * @param maze 미로 정보 (N * M)
 * @param N 
 * @param M 
 * @param visited 방문 정보
 */
function bfs(node, dist, maze, N, M, visited = Array.from({length: N}, () => Array(M).fill(0))) {   
    const [y, x] = node;
    const [distY, distX] = dist;
    // 상하 좌우
    const dx = [0, 0, -1, 1]
    const dy = [-1, 1, 0, 0];
    const queue = [node];
    visited[y][x] = 1;
    while(queue.length > 0) {
        const [currY, currX] = queue.shift();
        if (currY === distY && currX === distX) {
            return visited[currY][currX];
        }
        for(let i = 0; i < 4; i++) {
            const ny = dy[i] + currY;
            const nx = dx[i] + currX;
            if(ny >= 0 && ny < N && nx >= 0 && nx < M) {
                if(maze[ny][nx] === 1 && visited[ny][nx] === 0) {
                    visited[ny][nx] = visited[currY][currX] + 1;
                    queue.push([ny, nx]);
                }
            }
        }
    }
    return visited[distY][distX];
}

// const input = "4 6\n101111\n101010\n101011\n111011"

const fs = require('fs');
const input = fs.readFileSync(0).toString();

solution(input)