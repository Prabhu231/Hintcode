function generateLinkedListCycleTestCases(num: number) {
  const testCases = []

  for (let i = 0; i < num; i++) {
    const length = Math.floor(Math.random() * 10) + 1;
    const values = Array.from({ length }, () => Math.floor(Math.random() * 100));

    // Randomly decide to create a cycle or not
    const createCycle = Math.random() < 0.5;
    let pos = -1;

    if (createCycle) {
      pos = Math.floor(Math.random() * length); // valid position
    }

    const expected_output = createCycle;

    testCases.push({
      problemName: "Linked List Cycle",
      input: {
        head: values,
        pos: pos,
      },
      expected_output,
    });
  }

  testCases.push({ problemName: "Linked List Cycle", input: { head: [3, 2, 0, -4], pos: 1 }, expected_output: true },
    { problemName: "Linked List Cycle", input: { head: [1, 2], pos: 0 }, expected_output: true },
    { problemName: "Linked List Cycle", input: { head: [1], pos: -1 }, expected_output: false },
    { problemName: "Linked List Cycle", input: { head: [1, 2, 3, 4], pos: -1 }, expected_output: false },
    { problemName: "Linked List Cycle", input: { head: [1, 2, 3, 4], pos: 4 }, expected_output: false }, // invalid pos
    { problemName: "Linked List Cycle", input: { head: [], pos: 0 }, expected_output: false })

  return testCases;
}

export default generateLinkedListCycleTestCases
