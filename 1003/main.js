function solution(arr) {
    const sorted = [...arr].sort((a, b) => b - a);
    const cached = {};
    
    function fibonacci(n) {
        if(cached[n]) return cached[n];
        if(n === 0) {
            cached[n] = [0, 1, 0];
            return cached[n];
        }
        if(n === 1) {
            cached[n] = [1, 0, 1];
            return cached[n];
        }
        const n1 = fibonacci(n - 1);
        const n2 = fibonacci(n - 2);
        const [val, zc, oc] = [n1[0] + n2[0], n1[1] + n2[1], n1[2] + n2[2]] 
        cached[n] = [val, zc, oc];
        return cached[n];
    }
    fibonacci(sorted[0]);
    
    for(const n of arr) {
        console.log(cached[n][1] + " " + cached[n][2])
    }

}


const inputs1Str = "3\n0\n1\n3"
const inputs2Str = "2\n6\n22"

/**
 * @param {String} str 
 */
function parseInput(str) {
    const data = str.split("\n").map((v) => Number(v));
    return data.slice(1);
}

// solution(parseInput(inputs1Str));
// solution(parseInput(inputs2Str));

const fs = require('fs');
const inputs = fs.readFileSync(0).toString().trim()

solution(parseInput(inputs));