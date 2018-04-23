import {Storage} from './storageModel.js';
import {config} from '../config.js'
/**
 * Class implement object of one link which provide ability to choose necessary new's channel.
 */
class LinkModel {
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
    this.storage = new Storage;
    this.init();
  }

  /**
   * Function which call after user click event
   *
   * @this {linkModel}
   */
  todoClick() {
    this.selected = !this.selected;
    if(this.selected){
      this.storage.setItem(this.source, config.keyWord);
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
    this.selected = !!(Storage.getItem(this.source));
  }
}

export {LinkModel};
