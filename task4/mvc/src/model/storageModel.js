import {EventObserver} from "./eventObserverModel";

/**
 * This is implement of Creation pattern singleton according with task.
 *
 * This class implements wrapper to localStorage (if necessary it can be change to something else).
 * After updating some value will call actionUpdate in eventObserver.
 */
let storageInstance = null;
class storage  {

  /**
   * Creates an instance of storage.
   *
   * @constructor
   * @this {storage}
   * return storageInstance - release of pattern singleton.
   */
  constructor() {
    this.actionUpdate = new EventObserver;
    if(!storageInstance) {
      storageInstance = this;
    }
    return storageInstance;
  }

  /**
   * Save some item to storage. and call actionUpdate in EventObserver.
   *
   * @this {storage}
   * @param {String} key.
   * @param {String} value.
   */
  setItem(key,value) {
    localStorage.setItem(key,value);
    this.actionUpdate.broadcast();
  }

  /**
   * Delete item from storage. and call actionUpdate in EventObserver.
   *
   * @this {storage}
   * @param {String} key.
   */
  removeItem(key) {
    localStorage.removeItem(key);
    this.actionUpdate.broadcast();
  }

  /**
   * Return item from storage with key.
   *
   * @this {storage}
   * @param {String} key.
   * @return {Object}
   */
  static getItem(key) {
    return localStorage.getItem(key);
  }

  /**
   * Return array with all items.
   *
   * @this {storage}
   * @return {Array}
   */
  static getArray() {
    return localStorage;
  }
}

export {storageInstance};
export {storage};