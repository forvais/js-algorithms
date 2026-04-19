export type Optional<T> = T | null | undefined;

export interface Collection {
  /**
   * Returns the size of the element.
   */
  get size(): number;

  /**
   * Returns true if the array is empty.
   */
  isEmpty(): boolean;

  /**
   * Returns true if the array is empty, else false if it has at least one element.
   */
  clear(): void;
}
