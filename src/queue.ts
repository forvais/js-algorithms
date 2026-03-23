import { Collection } from './collection.js';

export class Queue<T> extends Collection<T> {
  public push(el: T) {
    this.buffer.push(el);
  }

  public pop() {
    return this.buffer.shift();
  }
}
