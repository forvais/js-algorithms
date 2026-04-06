import { Collection } from './collection.js';

function parent(idx: number) {
  return Math.floor((idx - 1) / 2);
}

function left(idx: number) {
  return 2 * idx + 1;
}

function right(idx: number) {
  return 2 * idx + 2;
}

function isNonNullable<T>(val: T): val is NonNullable<T> {
  return typeof val !== 'undefined' && val !== undefined && val !== null;
}

export class Heap<T> extends Collection<T> {
  public constructor(protected readonly comparator: (parent: T, child: T) => boolean) {
    super();
  }

  protected swap(a: number, b: number) {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const lhst = this.buffer[a]!;
    this.buffer[a] = this.buffer[b]!;
    this.buffer[b] = lhst;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  protected rebalance(parentNode: number) {
    if (!(parentNode >= 0 && parentNode < this.buffer.length)) throw new RangeError(`No node found at index ${parentNode}.`);

    const pNodeValue = this.buffer[parentNode];
    if (!isNonNullable(pNodeValue)) throw new Error('Node value is not a comparable value.');

    const lNode = left(parentNode);
    const rNode = right(parentNode);
    let maxLeafNode = parentNode;

    const lNodeValue = this.buffer[lNode];
    const rNodeValue = this.buffer[rNode];

    if (isNonNullable(lNodeValue) && this.comparator(pNodeValue, lNodeValue)) {
      maxLeafNode = lNode;
    }

    if (isNonNullable(rNodeValue) && isNonNullable(lNodeValue) && this.comparator(lNodeValue, rNodeValue)) {
      maxLeafNode = rNode;
    }

    if (maxLeafNode !== parentNode) {
      this.swap(parentNode, maxLeafNode);
    }

    return maxLeafNode;
  }

  protected siftUp() {
    let node = this.buffer.length - 1;

    while (node !== 0) {
      const parentNode = parent(node);
      this.rebalance(parentNode);
      node = parentNode;
    }
  }

  protected siftDown() {
    const lastNonLeafNode = Math.floor((this.buffer.length - 1) / 2);
    let node = 0; // root

    while (node <= lastNonLeafNode) {
      const nextNode = this.rebalance(node);
      if (node === nextNode) break;
      node = nextNode;
    }
  }

  public push(el: T) {
    this.buffer.push(el);

    if (this.buffer.length > 1) {
      this.siftUp();
    }
  }

  public override peek() {
    return this.buffer[0];
  }

  public pop() {
    this.swap(0, this.buffer.length - 1);
    const el = this.buffer.pop();
    this.siftDown();
    return el;
  }
}

export class MaxHeap<T> extends Heap<T> {
  constructor() {
    super((a, b) => a < b);
  }
}

export class MinHeap<T> extends Heap<T> {
  constructor() {
    super((a, b) => a > b);
  }
}
