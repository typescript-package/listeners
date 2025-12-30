import { ListenerFunction } from "@typedly/listeners";
import { Listeners } from "../lib";
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

      this.add(onceListener as L);

    });
    return this;
  }

  public snapshot(): L[] {
    return Array.from(this.value);
  }
}


const listeners = new Listeners(false, ListenersSetAdapter, (msg: string) => {
  console.log(`Listener 1: ${msg}`);
});

listeners.add((msg: string) => {
  console.log(`Listener 2: ${msg}`);
});

listeners.once((msg: string) => {
  console.log(`Once Listener: ${msg}`);
});

const snapshot = listeners.snapshot();
console.log(`Snapshot has ${snapshot.length} listeners.`);
