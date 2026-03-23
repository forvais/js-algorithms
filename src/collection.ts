export abstract class Collection<T> implements Iterable<T> {
  protected buffer: T[] = [];

  public abstract peek(): T | undefined;

  public get size() {
    return this.buffer.length;
  }

  public isEmpty() {
    return this.size === 0;
  }

  public clear() {
    this.buffer.length = 0;
  }

  public toArray() {
    return structuredClone(this.buffer);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.buffer.values();
  }
}
