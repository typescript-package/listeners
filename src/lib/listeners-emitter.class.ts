// Abstract.
import { ListenersBase } from "./listeners.base";
// Type & Interface.
import { ListenerFunction, ListenersAdapter } from "@typedly/listeners";
import { AsyncReturn } from '@typedly/data';
/**
 * @description The concrete class for emitting a collection of listeners.
 * @export
 * @class ListenersEmitter
 * @template {any[]} G The arguments passed to listeners.
 * @template {ListenerFunction<G>} L The listener function type.
 * @template T The type of the collection.
 * @template {boolean} R Indicates if the execution is asynchronous.
 * @template {ListenersAdapter<G, L, T, R>} A The adapter type for managing the collection.
 * @extends {ListenersBase<G, L, T, R, A>}
 */
export class ListenersEmitter<
  G extends any[],
  L extends ListenerFunction<G>,
  T,
  R extends boolean,
  A extends ListenersAdapter<G, L, T, R>
> extends ListenersBase<G, L, T, R, A> {
  /**
   * @description The parameter to switch between synchronous and asynchronous execution.
   * @type {R}
   */
  #async: R;

  /**
   * Creates an instance of `ListenersEmitter`.
   * @constructor
   * @param {R} async The parameter to switch between synchronous and asynchronous execution.
   * @param {new (...listeners: L[]) => A} adapter The adapter class for managing the collection.
   * @param {...L[]} listeners The listeners to add to the collection.
   */
  constructor(
    async: R,
    adapter: new (...listeners: L[]) => A,
    ...listeners: L[]
  ) {
    super(async, adapter, ...listeners);
    this.#async = async;
  }

  /**
   * @description Emits the listeners with the provided arguments.
   * @public
   * @param {...G} args The arguments to pass to each listener.
   * @returns {AsyncReturn<R, this>} The current instance or a promise resolving to it.
   */
  public emit(...args: G): AsyncReturn<R, this> {
    return (this.#async === true)
      ? (this.snapshot() as AsyncReturn<true, L[]>)
        .then(listeners => Promise.all(listeners.map(listener => listener(...args))))
        .then(() => this) as AsyncReturn<R, this>
      : this.forEach(listener => listener(...args)),
        super.asyncReturn(this);
  }
}
