import {storage} from "../model/storageModel";
import {urlRequest} from "../model/urlRequestModel.js";

/**
 * Class controller for newsList object.
 *
 * In that class implement functions which will execute when happen some event and it will have influence for EventObserver.
 */
class newsController {

  /**
   * Creates an instance of newsController.
   *
   * @constructor
   * @this {newsController}
   * @param {object} newsListObj. Object of newsModel class.
   * @param {class} view. Class with implementation of display element from list.
   */
  constructor(newsListObj,view) {
    this.storage = new storage;
    this.request = new urlRequest;
    this.newsList = newsListObj;
    this.view = view;
  }

  /**
   * function of initialization controller. Use to implement action in eventObserver.
   *
   * @this {newsController}
   */
  init() {
    // Logic for actionUpdate of storage.
    this.storage.actionUpdate.subscribe(() => {
      this.request.getResult(this.storage);
    });
    // Logic for actionPending of request.
    this.request.actionPending.subscribe(() => {
      console.log('start downloading');
    });
    // Logic for actionFulfilled of request.
    this.request.actionFulfilled.subscribe((data) => {
      console.log('finish downloading');
      this.newsList.updateData(data);
      this.drawNews();
    });
    this.request.getResult();
    this.drawNews();
  }

  /**
   * function of display (redraw) if newsList.
   *
   * @this {newsController}
   */
  drawNews() {
    // Do clear for newsList dom.
    this.newsList.domElement.innerHTML = '';

    // For each newsModel in list create a view and append it to list dom.
    if(this.newsList.list) {
      this.newsList.list.forEach((news) => {
        const imgView = new this.view(news);
        imgView.render();
        this.newsList.domElement.appendChild(imgView.domElement);
      });
    }
  }
}

export {newsController};
