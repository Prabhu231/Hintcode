const findCheapestPrice = (n: number, flights: number[][], src: number, dst: number, k: number): number => {
    const adj: Map<number, [number, number][]> = new Map();
    for (const [from, to, price] of flights) {
        if (!adj.has(from)) adj.set(from, []);
        adj.get(from)!.push([to, price]);
    }

    let minCost = Array(n).fill(Infinity);
    minCost[src] = 0;

    let queue: [number, number, number][] = [[src, 0, 0]]; // [city, stops, cost]

    while (queue.length) {
        const newQueue: [number, number, number][] = [];
        for (const [city, stops, cost] of queue) {
            if (stops > k) continue;
            if (!adj.has(city)) continue;

            for (const [nextCity, price] of adj.get(city)!) {
                if (cost + price < minCost[nextCity]) {
                    minCost[nextCity] = cost + price;
                    newQueue.push([nextCity, stops + 1, cost + price]);
                }
            }
        }
        queue = newQueue;
    }

    return minCost[dst] === Infinity ? -1 : minCost[dst];
};

const generateCheapestFlightTestCases = (count: number) => {
    const testCases = [];

    const generateFlightGraph = (numCities: number): { flights: number[][], src: number, dst: number, k: number } => {
        let flights: number[][] = [];
        let edges = new Set<string>();
        
        // Generate random flights
        for (let i = 0; i < numCities; i++) {
            let connections = Math.floor(Math.random() * Math.min(3, numCities)); // Limit connections
            for (let j = 0; j < connections; j++) {
                let from = i;
                let to = Math.floor(Math.random() * numCities);
                let price = Math.floor(Math.random() * 100) + 1; // Random price between 1 and 100
                
                if (from !== to && !edges.has(`${from}-${to}`)) {
                    flights.push([from, to, price]);
                    edges.add(`${from}-${to}`);
                }
            }
        }

        // Select random src and dst
        let src = Math.floor(Math.random() * numCities);
        let dst = Math.floor(Math.random() * numCities);
        let k = Math.floor(Math.random() * (numCities - 1)); // Random stops

        return { flights, src, dst, k };
    };

    for (let i = 0; i < count; i++) {
        const numCities = Math.floor(Math.random() * 5) + 3; // Cities between 3 and 7
        let { flights, src, dst, k } = generateFlightGraph(numCities);

        let expected_output = findCheapestPrice(numCities, flights, src, dst, k);

        testCases.push({
            problemName: "Cheapest Flights Within K Stops",
            input: { n: numCities, flights, src, dst, k },
            expected_output,
        });
    }

    return testCases;
};

export default generateCheapestFlightTestCases;
