import {EventObserver} from "./eventObserverModel";
import {Storage} from "../model/storageModel";
import {config} from "../config.js";
/**
 * This class use for getting data from remote server (news api).
 * Also this class call actionPending - when send response to get data, and actionFulfilled when data is received.
 */
class UrlRequest {

  /**
   * Creates an instance of urlRequest.
   *
   * @constructor
   * @this {urlRequest}
   */
  constructor () {
    this.actionPending = new EventObserver;
    this.actionFulfilled = new EventObserver;
  }

  /**
   * Return data from remote server.
   *
   * @this {urlRequest}
   * @return {Array}
   */
  getResult() {
    const sources = Storage.getArray(config.keyWord);
    const sourceString = sources.join(',');
    if (sourceString) {
      const url = `${config.url}?sources=${sourceString}&sortBy=${config.sortBy}&apiKey=${config.apiKey}`;
      this.actionPending.broadcast();
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data.articles;
        }).then((articles) => {
          this.actionFulfilled.broadcast(articles);
        });
    }else {
      this.actionFulfilled.broadcast([]);
    }
  }
}

export {UrlRequest};
