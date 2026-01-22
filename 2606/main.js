function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];

    const N = Number(next());
    const M = Number(next());
    const adj = Array.from({length:N}, () => []);
    for(let i = 0; i < M; i++) {
        const from = Number(next()) - 1;
        const to = Number(next()) - 1;
        adj[from].push(to);
        adj[to].push(from);
    }

    const result = bfs(0, adj, Array(N).fill(false));
    process.stdout.write((Math.max(result, 0)).toString());
}

function bfs(node, adj, visited) {
    const queue = [node];
    visited[node] = true;
    while(queue.length > 0) {
        const curr = queue.shift();
        for(const neighbor of adj[curr]) {
            if(!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }

    return visited.reduce((acc, v) => {
        if(v === true) acc++
        return acc;
    },0) - 1;
}

// const input = "7\n6\n1 2\n2 3\n1 5\n5 2\n5 6\n4 7";

const fs = require('fs');
const input = fs.readFileSync(0).toString();

solution(input);