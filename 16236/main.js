function solution(input = "") {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];

    const N = Number(next());
    const ground = [];
    let fishCount = 0;
    let shark = null;
    for(let y = 0; y < N; y++) {
        const row = [];
        for(let x = 0; x < N; x++) {
            let item = Number(next())
            if(item === 9) {
                shark = [y, x];
                item = 0;
            }
            row.push(item);
            if(item >= 1 && item <= 6) {
                fishCount++;
            }
        }
        ground.push(row);
    }
    const visited = Array.from({ length: N }, () => new Uint8Array(N));
    
    let eaten = 0;
    let moved = 0;
    let size = 2;
    let levelUpCount = 0;

    while(eaten < fishCount) {
        for(let i=0; i<N; i++) visited[i].fill(0);
        const huntingInfo = bfs(shark, ground,visited, N, size);
        if(huntingInfo === null) break;
        const [ny, nx, mo] = huntingInfo;
        eaten++;
        levelUpCount++;
        if(levelUpCount === size) {
            size++;
            levelUpCount = 0;
        }
        moved += mo;
        shark = [ny, nx];
        ground[ny][nx] = 0;
    }
    process.stdout.write(moved.toString());
}

function bfs(start, ground, visited, N, size) {
    const [startY, startX] = start;
    // y, x, 이동횟수
    const node = [startY, startX, 0];
    let head = 0;
    const queue = [node];
    let candidates = []; // 먹을 수 있는 물고기들 저장소
    let foundDist = Infinity; // 처음 물고기를 발견한 거리
    visited[startY][startX] = true;

    const dy = [1, -1, 0, 0];
    const dx = [0, 0, 1, -1]
    while(queue.length > head) {
        const curr = queue[head++];
        const [y, x, moved] = curr;

        // 이미 찾은 물고기보다 먼 곳은 더 볼 필요 없음
        if (moved > foundDist) break;

        // 먹을 수 있는 물고기인지 확인 (0 < 물고기 < 상어크기)
        if (ground[y][x] > 0 && ground[y][x] < size) {
            candidates.push([y, x, moved]);
            foundDist = moved; // 최단 거리를 고정
            continue; // 같은 거리의 다른 물고기도 더 찾아봐야 하므로 큐에는 안 넣음
        }

        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            if(nx >= 0 && nx < N && ny >= 0 && ny < N) {
                if (ground[ny][nx] <= size && visited[ny][nx] === 0) { // 통과 가능 조건
                    visited[ny][nx] = 1;
                    queue.push([ny, nx, moved + 1]);
                }
            }
        }

    }

    if (candidates.length === 0) return null;

    candidates.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return candidates[0];
}

const fs = require("fs");
// const input = "3\n0 0 1\n0 0 0\n0 9 0";
// const input = "6\n5 4 3 2 3 4\n4 3 2 3 4 5\n3 2 9 5 6 6\n2 1 2 3 4 5\n3 2 1 6 5 4\n6 6 6 6 6 6"
const input = fs.readFileSync(0).toString();

solution(input)