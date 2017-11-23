import {storage} from './storageModel.js';
/**
 * Class implement object of one link which provide ability to choose necessary new's channel.
 */
class linkModel {
  /**
   * Creates an instance of linkModel.
   *
   * @constructor
   * @this {linkModel}
   * @param {object} parameter. This parameter equal to element from channelList array which described in config.js file.
   */
  constructor(parameter) {
    this.source = parameter.source;
    this.title = parameter.title;
    this.storage = new storage;
    this.init();
  }

  /**
   * Function which call after user click event
   *
   * @this {linkModel}
   */
  todoClick() {
    this.selected = !this.selected; // Change selected status to opposite.
    // According with state of selected, add or delete this ite, from storage.
    if(this.selected){
      this.storage.setItem(this.source,'chanel');
    }else {
      this.storage.removeItem(this.source);
    }
  }

  /**
   * Function which call when object creating. This function set selected state according with information in storage.
   *
   * @this {linkModel}
   */
  init() {
    this.selected = !!(storage.getItem(this.source));
  }
}

export {linkModel};
