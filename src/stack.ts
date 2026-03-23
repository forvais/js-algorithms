import { Collection } from './collection.ts';

export class Stack<T> extends Collection<T> {
  public push(value: T) {
    this.buffer.push(value);
  }

  public pop() {
    return this.buffer.pop();
  }
}
