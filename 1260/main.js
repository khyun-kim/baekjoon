function solution(input) {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];
    const N = Number(next());
    const M = Number(next());
    const V = Number(next());
    const graph = Array.from({length: N + 1}, () => []);
    for(let i = 0; i < M; i++) {
        const from = Number(next());
        const to = Number(next());
        graph[from].push(to);
        graph[to].push(from);
    }
    graph.forEach((v) => v.sort((a, b) => a - b))
    const dfsVisited = Array(N + 1).fill(false);
    const dfsResult = [];
    
    dfs(V, graph, dfsVisited, dfsResult);
    
    const bfsVisited = Array(N + 1).fill(false);
    const bfsResult = [];
    bfs(V, graph, bfsVisited, bfsResult);

    process.stdout.write(dfsResult.join(" ") + "\n" + bfsResult.join(" "));
}

function dfs(node, graph, visited, result) {
    visited[node] = true;
    result.push(node);
    for(const neighbor of graph[node]) {
        if(!visited[neighbor]) dfs(neighbor, graph, visited, result);
    }
}


function bfs(node, graph, visited, result) {
    const queue = [node];
    visited[node] = true;
    while(queue.length > 0) {
        const curr = queue.shift();
        result.push(curr);
        for(const neighbor of graph[curr]) {
            if(!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            } 
        }
    }
}

// const input = "4 5 1\n1 2\n1 3\n1 4\n2 4\n3 4";
// solution(input)

const fs = require('fs');
const input = fs.readFileSync(0).toString();
solution(input)