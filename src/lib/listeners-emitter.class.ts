// Abstract.
import { ListenersBase } from "./listeners.base";
// Type & Interface.
import { ListenerFunction, ListenersAdapter } from "@typedly/listeners";
import { AsyncReturn } from '@typedly/data';
/**
 * @description
 * @export
 * @class ListenersEmitter
 * @template {any[]} G 
 * @template {ListenerFunction<G>} L 
 * @template T 
 * @template {boolean} R 
 * @template {ListenersAdapter<G, L, T, R>} A 
 * @extends {ListenersBase<G, L, T, R, A>}
 */
export class ListenersEmitter<
  G extends any[],
  L extends ListenerFunction<G>,
  T,
  R extends boolean,
  A extends ListenersAdapter<G, L, T, R>
> extends ListenersBase<G, L, T, R, A> {
  #async: R;

  constructor(
    async: R,
    adapter: new (...listeners: L[]) => A,
    ...listeners: L[]
  ) {
    super(async, adapter, ...listeners);
    this.#async = async;
  }

  public emit(...args: G): AsyncReturn<R, this> {
    return (this.#async === true)
      ? (this.snapshot() as AsyncReturn<true, L[]>)
        .then(listeners => Promise.all(listeners.map(listener => listener(...args))))
        .then(() => this) as AsyncReturn<R, this>
      : this.forEach(listener => listener(...args)),
        super.asyncReturn(this);
  }
}
