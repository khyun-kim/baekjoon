const dy = [1,-1,0,0];
const dx = [0,0,-1,1]

function solution(input = "") {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0]

    const N = Number(next());
    const world = [];
    const ground = [];
    for(let y = 0; y < N; y++) {
        const row = new Int16Array(N);
        for(let x = 0; x < N; x++) {
            row[x] = Number(next());
            if(row[x] === 1) row[x] = -1;
            ground.push([y, x]);
        }
        world.push(row);
    }
    let islandCount = 0;
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (world[y][x] === -1) {
                islandCount++;
                paintGround(islandCount, world,[y, x]);
            }
        }
    }
    
    let min = Infinity;
    for (let i = 1; i <= islandCount; i++) {
        const res = getMinBridgeDist(i, world);
        if (res < min) min = res;
    }
    process.stdout.write(min.toString());
}

function paintGround(num, world, start) {
    const N = world.length
    const [sy, sx] = start;

    if(world[sy][sx] !== -1) return 0;

    let count = 1;
    world[sy][sx] = num;
    let head = 0;
    const queue = [start];

    while(queue.length > head) {
        const [y, x] = queue[head++];
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            if(nx >= 0 && nx < N && ny >=0 && ny < N) {
                if(world[ny][nx] === -1) {
                    world[ny][nx] = num;
                    queue.push([ny, nx]);
                    count++;
                }
            }
        }
    }
    
    return count;
}

function getMinBridgeDist(islandNumber, world) {
    const N = world.length;
    let head = 0;
    const queue = [];
    const dist = Array.from({ length: N }, () => new Int16Array(N).fill(-1));
    for(let y = 0; y < N; y++) {
        for(let x = 0; x < N; x++) {
            if(world[y][x] === islandNumber) {
                queue.push([y, x]);
                dist[y][x] = 0;
            }
        }
    }

    while(queue.length > head) {
        const [y, x] = queue[head++];
        for(let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;

            if(world[ny][nx] !== 0 && world[ny][nx] !== islandNumber) {
                return dist[y][x];
            }
            if(world[ny][nx] === 0 && dist[ny][nx] === -1 ) {
                dist[ny][nx] = dist[y][x] + 1;
                queue.push([ny, nx]);
            }
        }
    }

    return Infinity;
}

const fs = require('fs');

// const input = "10\n1 1 1 0 0 0 0 1 1 1\n1 1 1 1 0 0 0 0 1 1\n1 0 1 1 0 0 0 0 1 1\n0 0 1 1 1 0 0 0 0 1\n0 0 0 1 0 0 0 0 0 1\n0 0 0 0 0 0 0 0 0 1\n0 0 0 0 0 0 0 0 0 0\n0 0 0 0 1 1 0 0 0 0\n0 0 0 0 1 1 1 0 0 0\n0 0 0 0 0 0 0 0 0 0"

const input = fs.readFileSync(0).toString();

solution(input)