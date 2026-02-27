// Base.
import { ListenersBase } from "./listeners.base";
// Type definitions.
import {
  // Type,
  ListenerFunction,
  // Interface.
  ListenersAdapter,
} from "@typedly/listeners";
/**
 * @description The concrete class for managing a collection of listeners.
 * @export
 * @class Listeners
 * @template {ListenersAdapter<G, L, T, R>} A The adapter type for managing the collection.
 * @template {ListenerFunction<G>} [L=A extends ListenersAdapter<any, infer U, any, any> ? U : never] The type of listener functions, inferred from the adapter if not explicitly provided.
 * @template {any[]} [G=L extends ListenerFunction<infer V> ? V : never] The arguments passed to listeners, inferred from the listener function type if not explicitly provided.
 * @template [T=A extends ListenersAdapter<G, L, infer U, any> ? U : never] The type of the underlying collection, inferred from the adapter if not explicitly provided.
 * @template {boolean} [R=A extends ListenersAdapter<G, L, any, infer V> ? V : never] Indicates if the listeners are asynchronous, inferred from the adapter if not explicitly provided.
 * @extends {ListenersBase<A, L, G, T, R>}
 */
export class Listeners<
  A extends ListenersAdapter<G, L, T, R>,
  L extends ListenerFunction<G> = A extends ListenersAdapter<any, infer U, any, any> ? U : never,
  G extends any[] = L extends ListenerFunction<infer V> ? V : never,
  T = A extends ListenersAdapter<G, L, infer U, any> ? U : never,
  R extends boolean = A extends ListenersAdapter<G, L, any, infer V> ? V : never
> extends ListenersBase<A, L, G, T, R> {
  /**
   * @description The toStringTag of the Listeners class.
   * @public
   * @returns {string} 
   */
  public override get [Symbol.toStringTag]() {
    return 'Listeners';
  }
}
