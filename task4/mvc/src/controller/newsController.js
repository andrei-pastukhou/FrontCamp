import {Storage} from "../model/storageModel";
import {UrlRequest} from "../model/urlRequestModel.js";

/**
 * Class controller for newsList object.
 *
 * In that class implement functions which will execute when happen some event and it will have influence for EventObserver.
 */
class NewsController {

  /**
   * Creates an instance of newsController.
   *
   * @constructor
   * @this {newsController}
   * @param {object} newsListObj. Object of newsModel class.
   * @param {class} view. Class with implementation of display element from list.
   */
  constructor(newsListObj,view) {
    this.storage = new Storage;
    this.request = new UrlRequest;
    this.newsList = newsListObj;
    this.view = view;
  }

  /**
   * function of initialization controller. Use to implement action in eventObserver.
   *
   * @this {newsController}
   */
  init() {

    const newsUpdate = () => { this.request.getResult(this.storage); };
    const newsPending = () => {console.log('start downloading');};
    const newsFulfilled = (data) => {
      console.log('finish downloading');
      this.newsList.updateData(data);
      this.drawNews();
    };

    this.storage.actionUpdate.subscribe(newsUpdate);
    this.request.actionPending.subscribe(newsPending);
    this.request.actionFulfilled.subscribe((data) => {newsFulfilled(data)});

    this.request.getResult();
    this.drawNews();
  }

  /**
   * function of display (redraw) if newsList.
   *
   * @this {newsController}
   */
  drawNews() {
    this.newsList.domElement.innerHTML = '';
    if(Array.isArray(this.newsList.list) && (this.newsList.list.length > 0)) {
      this.newsList.list.forEach((news) => {
        const imgView = new this.view(news);
        imgView.render();
        this.newsList.domElement.appendChild(imgView.domElement);
      });
    }
  }
}

export {NewsController};
