import { Collection } from './collection.js';

interface PriorityItem<T> {
  value: T,
  priority: number,
}

export class PriorityQueue<T> extends Collection<T, PriorityItem<T>> {
  public constructor() {
    super(el => el.value);
  }

  public insert(el: T, priority: number) {
    const item = {
      value: el,
      priority,
    };

    let insertIdx = 0;
    for (let idx = 0; idx < this.buffer.length; idx++) {
      const storedItem = this.buffer[idx];
      if (storedItem) {
        if (item.priority > storedItem.priority) break;
        insertIdx = idx;
      }
    }

    this.buffer.splice(insertIdx + 1, 0, item);
  }

  public pop() {
    const el = this.peek();
    this.buffer.shift();
    return el;
  }

  public override peek() {
    const el = this.buffer[0];

    if (!this.transform) return el as T;
    return el !== undefined ? this.transform(el) : undefined;
  }
}
