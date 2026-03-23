import { Collection } from './collection.js';

export class Queue<T> extends Collection<T> {
  public push(el: T) {
    this.buffer.push(el);
  }

  public override peek() {
    return this.buffer[0];
  }

  public pop() {
    return this.buffer.shift();
  }
}
