const canFinish = function (numCourses: number, prerequisites: number[][]): boolean {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const inDegree: number[] = Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let completedCourses = 0;
    while (queue.length) {
        const course = queue.shift()!;
        completedCourses++;
        for (const nextCourse of graph[course]) {
            if (--inDegree[nextCourse] === 0) queue.push(nextCourse);
        }
    }

    return completedCourses === numCourses;
};

const generateCourseScheduleTestCases = (count: number) => {
    const testCases = [];

    const generatePrerequisites = (numCourses: number) => {
        const prerequisites: number[][] = [];
        const edges = new Set<string>();

        for (let i = 0; i < numCourses; i++) {
            const prereqCount = Math.floor(Math.random() * Math.min(3, numCourses)); // Limit prerequisites
            for (let j = 0; j < prereqCount; j++) {
                const prereq = Math.floor(Math.random() * numCourses);
                if (prereq !== i && !edges.has(`${i},${prereq}`)) {
                    prerequisites.push([i, prereq]);
                    edges.add(`${i},${prereq}`);
                }
            }
        }

        return prerequisites;
    };

    for (let i = 0; i < count; i++) {
        const numCourses = Math.floor(Math.random() * 5) + 2; // Courses between 2 and 6
        const prerequisites = generatePrerequisites(numCourses);

        const expected_output = canFinish(numCourses, prerequisites);

        testCases.push({
            problemName: "Course Schedule",
            input: { numCourses, prerequisites },
            expected_output,
        });
    }

    return testCases;
};

export default generateCourseScheduleTestCases;
