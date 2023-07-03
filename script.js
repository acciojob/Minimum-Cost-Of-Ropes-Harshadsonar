function findMinimumCostRopes(ropes) {
  const minHeap = new MinHeap();
  for (let i = 0; i < ropes.length; i++) {
    minHeap.insert(ropes[i]);
  }

  let cost = 0;
  while (minHeap.size() > 1) {
    const min1 = minHeap.extractMin();
    const min2 = minHeap.extractMin();
    const sum = min1 + min2;
    cost += sum;
    minHeap.insert(sum);
  }

  return cost;
}

// Implementation of MinHeap data structure
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown(index) {
    const lastIndex = this.heap.length - 1;
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild <= lastIndex && this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }
      if (rightChild <= lastIndex && this.heap[rightChild] < this.heap[smallest]) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

// Read the input from the text field
const input = document.getElementById("input");
const resultDiv = document.getElementById("result");

input.addEventListener("submit", function (event) {
  event.preventDefault();
  const ropes = input.value
    .split(",")
    .map((rope) => parseInt(rope.trim()));
  const minimumCost = findMinimumCostRopes(ropes);
  resultDiv.innerHTML = `Minimum cost of connecting ropes: ${minimumCost}`;
});
