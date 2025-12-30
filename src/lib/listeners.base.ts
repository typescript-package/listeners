// Class.
import { CollectionBase } from '@typescript-package/collection';
// Interface,
import { AsyncReturn } from '@typedly/data';
import {
  // Type.
  ListenerFunction,
  // Interface.
  ListenersAdapter,
  ListenersShape
} from '@typedly/listeners';
/**
 * @description The base class for managing a collection of listeners.
 * @export
 * @abstract
 * @class ListenersBase
 * @template {any[]} G 
 * @template {ListenerFunction<G>} L 
 * @template T 
 * @template {boolean} R 
 * @template {CollectionAdapter<L, T, R>} A 
 * @extends {CollectionBase<L, T, R, A>}
 */
export abstract class ListenersBase<
  G extends any[],
  L extends ListenerFunction<G>,
  T,
  R extends boolean,
  A extends ListenersAdapter<G, L, T, R>
> extends CollectionBase<L, T, R, A>
  implements ListenersShape<G, L, T, R> {
  /**
   * Creates an instance of `ListenersBase`.
   * @constructor
   * @param {R} async Switch between synchronous and asynchronous execution of specific methods.
   * @param {new (...listeners: L[]) => A} adapter The adapter class for managing the collection.
   * @param {...L[]} listeners The initial listeners to add to the collection.
   */
  constructor(
    async: R,
    adapter: new (...listeners: L[]) => A,
    ...listeners: L[]
  ) {
    super(async, adapter, ...listeners);
  }

  /**
   * @description Adds listener invoked once.
   * @public
   * @param {L} listener 
   * @returns {this} 
   */
  public once(...listener: L[]): AsyncReturn<R, this> {
    return super.asyncReturn(this.adapter.once(...listener));
  }

  /**
   * @description Returns a snapshot of listeners.
   * @public
   * @returns {L[]} 
   */
  public snapshot(): AsyncReturn<R, L[]> {
    return this.adapter.snapshot();
  }
}
