import { ListenerFunction } from "@typedly/listeners";
import { ListenersEmitter } from "../lib";
import { SetAdapter } from "@typescript-package/collection-adapter";

export class ListenersSetAdapter<
  G extends any[],
  L extends ListenerFunction<G>,
> extends SetAdapter<L> {
  public once(...listeners: L[]): this {
    listeners.forEach(listener => {
      if (this.has(listener)) {
        throw new Error('Listener already exists in the collection.');
      }

      const onceListener = (...args: G) => (
        this.delete(onceListener as L),
        listener(...args)
      );

      this.add(onceListener as L)

    });
    return this;
  }

  public snapshot(): L[] {
    return Array.from(this.value);
  }
}


const listenersEmitter = new ListenersEmitter(false, ListenersSetAdapter, (msg: string) => {
  console.log(`Listener 1: ${msg}`);
});

listenersEmitter.add((msg: string) => {
  console.log(`Listener 2: ${msg}`);
});

listenersEmitter.once((msg: string) => {
  console.log(`Once Listener: ${msg}`);
});

listenersEmitter.emit('Hello, World!');

const snapshot = listenersEmitter.snapshot();
console.log(`Snapshot has ${snapshot.length} listeners.`);
