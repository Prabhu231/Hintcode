class MaxHeap {
    private heap: number[] = [];

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private leftChild(index: number): number {
        return 2 * index + 1;
    }

    private rightChild(index: number): number {
        return 2 * index + 2;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    public enqueue(value: number): void {
        this.heap.push(value);
        this.heapifyUp();
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (index > 0 && this.heap[index] > this.heap[this.parent(index)]) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    public dequeue(): number | null {
        if (this.heap.length === 0) {
            return null;
        }
        const max = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return max;
    }

    private heapifyDown(): void {
        let index = 0;
        let left = this.leftChild(index);
        let right = this.rightChild(index);

        while (left < this.heap.length) {
            let largerChildIndex = left;
            if (right < this.heap.length && this.heap[right] > this.heap[left]) {
                largerChildIndex = right;
            }

            if (this.heap[index] >= this.heap[largerChildIndex]) {
                break;
            }

            this.swap(index, largerChildIndex);
            index = largerChildIndex;
            left = this.leftChild(index);
            right = this.rightChild(index);
        }
    }

    public size(): number {
        return this.heap.length;
    }

    public front(): number {
        return this.heap[0];
    }
}

const lastStoneWeight = (stones: number[]): number => {
    const maxHeap = new MaxHeap();

    for (const stone of stones) {
        maxHeap.enqueue(stone);
    }

    while (maxHeap.size() > 1) {
        const stone1 = maxHeap.dequeue();
        const stone2 = maxHeap.dequeue();

        if (stone1 && stone2 && stone1 !== stone2) {
            maxHeap.enqueue(stone1 - stone2);
        }
    }

 
    return maxHeap.size() === 0 ? 0 : maxHeap.front();
};

const generateLastStoneWeightTestCases = (count: number) => {
    const testCases = [];
    
    for (let i = 0; i < count; i++) {
        let length = Math.floor(Math.random() * 10) + 2; 
        let stones = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1); 
        let expected_output = lastStoneWeight(stones);

        testCases.push({
            problemName: "Last Stone Weight",
            input: { stones },
            expected_output,
        });
    }

    return testCases;
};

export default generateLastStoneWeightTestCases;
