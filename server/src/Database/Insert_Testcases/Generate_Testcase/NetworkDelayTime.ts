function networkDelayTime(times: number[][], N: number, K: number): number {
    const tt = new Array(N + 1).fill(Infinity);
    tt[0] = 0;
    tt[K] = 0;
  
    let flag = true;
  
    while (flag) {
      flag = false;
      times.forEach(([u, v, w]) => {
        if (tt[u] !== Infinity && tt[v] > tt[u] + w) {
          tt[v] = tt[u] + w;
          flag = true;
        }
      });
    }
  
    const res = Math.max(...tt);
  
    return res === Infinity ? -1 : res;
  }

const generateNetworkDelayTimeTestCases = (count: number) => {
    const testCases = [];

   
    const generateRandomGraph = (n: number, maxEdges: number) => {
        const edges: [number, number, number][] = [];
        const existingEdges = new Set<string>();

        for (let i = 0; i < maxEdges; i++) {
            let u = Math.floor(Math.random() * n) + 1;
            let v = Math.floor(Math.random() * n) + 1;
            let w = Math.floor(Math.random() * 100) + 1; 

            if (u !== v && !existingEdges.has(`${u},${v}`)) {
                edges.push([u, v, w]);
                existingEdges.add(`${u},${v}`);
            }
        }

        return edges;
    };

    for (let i = 0; i < count; i++) {
        const n = Math.floor(Math.random() * 5) + 3; 
        const maxEdges = Math.floor(Math.random() * (n * (n - 1))) + 1; 
        const times = generateRandomGraph(n, maxEdges);
        const k = Math.floor(Math.random() * n) + 1;

   
        const expected_output = networkDelayTime(times, n, k); 

        testCases.push({
            problemName: "Network Delay Time",
            input: { n, times, k },
            expected_output,
        });
    }

    return testCases;
};

export default generateNetworkDelayTimeTestCases;
