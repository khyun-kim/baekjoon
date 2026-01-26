function solution(input = "") {
    const scanner = input.matchAll(/\S+/g);
    const next = () => scanner.next().value[0];

    const N = Number(next());

    let board = Array.from({length: N}, () => new Uint32Array(N).fill(0))
    let max = 0;
    for(let y = 0; y < N; y++) {
        for(let x = 0; x < N; x++) {
            board[y][x] = Number(next())
            if(max < board[y][x]) {
                max = board[y][x];
            }
        }
    }
    const res = dfs(0, max, board);
    process.stdout.write(res.toString());
    
}

function dfs(count, max, board) {
    if(count === 5) {
        return max;
    }
    const dirs = ['상','하','좌','우'];
    for(const dir of dirs) {
        const [next, nextMax] = move(board, dir);

        const res = dfs(count + 1, Math.max(max, nextMax), next);
        max = Math.max(max, res);
    }

    return max;
}


function move(_board, direction) {
    const N = _board.length;
    const result = Array.from({ length: N }, () => new Uint32Array(N).fill(0));
    let max = 0;
    for (let i = 0; i < N; i++) {
        let nums = [];
        if (direction === "좌" || direction === "우") {
            for (let j = 0; j < N; j++) {
                let idx = (direction === "우") ? (N - 1 - j) : j;
                if (_board[i][idx] > 0) nums.push(_board[i][idx]);
            }
        } else {
            for (let j = 0; j < N; j++) {
                let idx = (direction === "하") ? (N - 1 - j) : j;
                if (_board[idx][i] > 0) nums.push(_board[idx][i]);
            }
        }

        let merged = [];
        for (let j = 0; j < nums.length; j++) {
            const item = nums[j] === nums[j + 1] ? nums[j++] * 2 : nums[j];
            merged.push(item);
            if(max < item) max = item;
        }

        for (let j = 0; j < merged.length; j++) {
            if (direction === "좌") result[i][j] = merged[j];
            else if (direction === "우") result[i][N - 1 - j] = merged[j];
            else if (direction === "상") result[j][i] = merged[j];
            else if (direction === "하") result[N - 1 - j][i] = merged[j];
        }
    }
    return [result, max];
}

const fs = require('fs')
// const input = "3\n2 2 2\n4 4 4\n8 8 8";
// const input = "3\n2 0 0\n0 4 2\n2 0 2";

const input = fs.readFileSync(0).toString();

solution(input)