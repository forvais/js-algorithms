import type { Optional } from './types.js';

function transformIdentity<T, R>(el: R): T {
  return el as unknown as T;
}

export abstract class Collection<ViewType, StoredType = ViewType> implements Iterable<ViewType> {
  protected buffer: StoredType[] = [];

  public constructor(protected readonly transform: Optional<(el: StoredType) => ViewType> = transformIdentity<ViewType, StoredType>) { }

  public abstract peek(): ViewType | undefined;

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
    return this.transform
      ? structuredClone(this.buffer.map(this.transform))
      : structuredClone(this.buffer as unknown as ViewType[]);
  }

  [Symbol.iterator](): Iterator<ViewType> {
    return this.transform
      ? this.buffer.map(this.transform).values()
      : (this.buffer as unknown as ViewType[]).values();
  }
}
