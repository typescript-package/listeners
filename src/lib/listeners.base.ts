// Class.
import { CollectionBase, HybridCollection } from '@typescript-package/collection';
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
 * @template {ListenersAdapter<G, L, T, R>} A Adapter type for managing the collection.
 * @template {ListenerFunction<G>} [L=A extends ListenersAdapter<any, infer U, any, any> ? U : never] The type of listener functions, inferred from the adapter if not explicitly provided.
 * @template {any[]} [G=L extends ListenerFunction<infer V> ? V : never] The arguments passed to listeners, inferred from the listener function type if not explicitly provided.
 * @template [T=A extends ListenersAdapter<G, L, infer U, any> ? U : never] The type of the underlying collection, inferred from the adapter if not explicitly provided.
 * @template {boolean} [R=A extends ListenersAdapter<G, L, any, infer V> ? V : never] Indicates if the listeners are asynchronous, inferred from the adapter if not explicitly provided.
 * @extends {HybridCollection<A, L, T, R>} Base collection class.
 * @implements {ListenersShape<G, L, T, R>} Interface defining the shape of listeners collections.
 */
export abstract class ListenersBase<
  A extends ListenersAdapter<G, L, T, R>,
  L extends ListenerFunction<G> = A extends ListenersAdapter<any, infer U, any, any> ? U : never,
  G extends any[] = L extends ListenerFunction<infer V> ? V : never,
  T = A extends ListenersAdapter<G, L, infer U, any> ? U : never,
  R extends boolean = A extends ListenersAdapter<G, L, any, infer V> ? V : never
> extends HybridCollection<A, L, T, R>
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
   * @param {...L[]} listeners The listeners to add to the collection that will be invoked only once.
   * @returns {AsyncReturn<R, this>} 
   */
  public once(...listeners: L[]): AsyncReturn<R, this> {
    return super.returnThis(this.adapter.once(...listeners));
  }
  
  /**
   * @description Returns a snapshot of listeners.
   * @public
   * @returns {AsyncReturn<R, L[]>} 
   */
  public snapshot(): AsyncReturn<R, L[]> {
    return this.adapter.snapshot();
  }
}
