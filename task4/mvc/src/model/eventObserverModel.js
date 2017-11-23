/**
 * This is implement of behavior pattern observer according with task.
 * This class implements in each model, where is necessary to processing user's event or do some action according with
 * update some value.
 * This class is dependency for:
 *  urlRequestModel - to observe each step of getting data from url.(actionPending and actionFulfilled)\
 *  storageModel -  to observe every updating of storage. (actionUpdate)
 *  linkView - to observe user action of click on link to choose new's channel (actionClick)
 * Description of each action implement in controllers. In model's there are only action calling.
 */
class EventObserver {

  /**
   * Creates an instance of EventObserver.
   *
   * @constructor
   * @this {EventObserver}
   */
  constructor () {
    this.observers = []
  }

  /**
   * Push to array this.observers some function which is an action to some event.
   *
   * @this {EventObserver}
   * @param {function} fn.
   */
  subscribe (fn) {
    this.observers.push(fn)
  }

  /**
   * Execute all function from this.observers with parameter data.
   *
   * @this {EventObserver}
   * @param {object} data.
   */
  broadcast (data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

export {EventObserver};
