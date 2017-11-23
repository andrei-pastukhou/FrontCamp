/**
 * Class implenemt object of onq news. Each attribute of this class equal with data from remote server.
 */
class newsModel {

  /**
   * Creates an instance of newsModel.
   *
   * @constructor
   * @this {newsModel}
   * @param {object} parameter. This object from remote server (in each element of array which has been
   * returned by getResult function of urlRequestModel)
   */
  constructor(parameter) {
    this.author = parameter.author;
    this.description = parameter.description;
    this.publishedAt = parameter.publishedAt;
    this.source = parameter.source.name;
    this.title = parameter.title;
    this.url = parameter.url;
    this.urlToImage = parameter.urlToImage;
  }
}

export {newsModel};
