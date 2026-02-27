import { SetAdapter } from '@typescript-package/collection-adapter';
import { Listeners } from '../src/lib';
import { ListenerFunction } from '@typedly/listeners';

export class ListenersSetAdapter<
  G extends any[],
  L extends ListenerFunction<G>,
  T,
> extends SetAdapter<L> {
  /**
   * @description Adds listener invoked once.
   * @public
   * @param {L} listener 
   * @returns {this} 
   */
  public once(...listener: L[]): this {
    listener.forEach(listener => {
      const listenerOnce = ((...args: Parameters<L>) => {
        super.delete(listenerOnce);
        listener(...args);
      }) as L;
      return super.add(listenerOnce);
    });
    return this;
  }

  /**
   * @description Returns a snapshot of listeners.
   * @public
   * @returns {L[]} 
   */
  public snapshot(): L[] {
    return Array.from(super.value);
  }
}


const listeners = new Listeners(
  false,
  ListenersSetAdapter,
  ((a: number, b: number) => console.log('Listener 1', a, b)) as ListenerFunction<[number, number] | [string, boolean]>,
  ((a: string, b: boolean) => console.log('Listener 2', a, b)) as ListenerFunction<[string, boolean]>,
  // async (a, b) => {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   console.log('Listener 2', a, b);
  // }
);

listeners.add(() => console.log('Listener'));
