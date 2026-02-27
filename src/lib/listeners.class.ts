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
 * @template {any[]} G The arguments passed to listeners.
 * @template {ListenerFunction<G>} [L=ListenerFunction<G>] The listener function type.
 * @extends {ListenersBase<A, L, G, T, R>} Base listeners class.
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
