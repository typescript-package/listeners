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
 * @extends {ListenersBase<G, L>} Base listeners class.
 */
export class Listeners<
  G extends any[],
  L extends ListenerFunction<G>,
  T,
  R extends boolean,
  A extends ListenersAdapter<G, L, T, R>
>extends ListenersBase<G, L, T, R, A> {
  /**
   * @description The toStringTag of the Listeners class.
   * @public
   * @returns {string} 
   */
  public override get [Symbol.toStringTag]() {
    return 'Listeners';
  }
}
