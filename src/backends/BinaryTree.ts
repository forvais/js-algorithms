import type { Collection } from '#datastructures/types.js';

/**
 * A collection using a tree as the base data structure.
 */
export class BinaryTree<T> implements Collection {
  protected nodes: T[] = [];

  /**
   * Calculates the index of the parent.
   */
  protected static parent(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  /**
   * Calculates the index of the left-hand side child.
   */
  protected static left(idx: number) {
    return 2 * idx + 1;
  }

  /**
   * Calculates the index of the right-hand side child.
   */
  protected static right(idx: number) {
    return 2 * idx + 2;
  }

  /**
   * Returns a list of children.
   *
   * May return an empty array if no children are found.
   */
  protected _getNodeChildren(idx: number) {
    const children = [];

    const l = BinaryTree.left(idx);
    if (l > this.nodes.length) children.push(l);

    const r = BinaryTree.right(idx);
    if (r > this.nodes.length) children.push(r);

    return children;
  }

  /**
   * Adds a new node to the tree.
   */
  protected _addNode(data: T) {
    this.nodes.push(data);
  }

  /**
   * Swaps the data between two nodes.
   */
  protected _swap(node: number, otherNode: number) {
    // Throw if either of the nodes do not exist.
    if (node >= this.nodes.length || otherNode >= this.nodes.length) throw new Error('One or more nodes do not exist.');

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const nodeDataTmp = this.nodes[node]!;
    this.nodes[node] = this.nodes[otherNode]!;
    this.nodes[otherNode] = nodeDataTmp;
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  /**
   * Removes the node at index.
   */
  protected _remove(idx: number) {
    this._swap(idx, this.nodes.length - 1); // Swap the node with the last node
    this.nodes.length -= 1; // Shorten the array to remove the last element
  }

  /**
   * Returns the size of the element.
   */
  public get size() {
    return this.nodes.length;
  }

  /**
   * Returns true if the array is empty, else false if it has at least one element.
   */
  public isEmpty() {
    return this.size === 0;
  }

  /**
   * Clears the entire tree.
   */
  public clear() {
    this.nodes.length = 0;
  }
}
