import {customFormateDate} from '../utility/utility.js'

// Initial content of the news-note element.
const template = `
    <div class="card" style="width: 20rem;">
        <img class="card-img-top">
        <div class="card-body">
            <h4 class="card-title"></h4>
            <p class="card-text"></p>
                 <p class="card-text"><small class="text-muted source"></small></p>
                 <p class="card-text"><small class="text-muted publishedAt"></small></p>
            <a href="#" class="btn btn-primary">Read more</a>
        </div>
     </div>
`;
// Class of new html elements.
class NewsNote extends HTMLElement {

  // Fires when an instance of the element is created.
  /**
   * Calls when instance is created (document.createElement('news-note')).
   *
   * @constructor
   * @this {NewsNote}
   */
  createdCallback() {
    this.innerHTML = template;
    this.descriptionElement = this.querySelector('.card-text');
    this.publishedAtElement = this.querySelector('.publishedAt');
    this.sourceElement = this.querySelector('.source');
    this.titleElement = this.querySelector('.card-title');
    this.urlElement = this.querySelector('.btn');
    this.imgElement = this.querySelector('.card-img-top')
  }
  /**
   * Function set attributes to HTMLElement of note according with object's attributes.
   *
   * @this {NewsNote}
   * @param {Object} news is a object with next structure :
   *                {
   *                  author: 'name of author', description : 'description', publishedAt : 'time when was publish',
   *                  source : {id: , title},
   *                  title: 'title of news', url: 'url to source', urlToImage: 'url to get image to news'
   *                }
   *
   */// Sets the parametrs of the note.
  setNews(news) {
    const {name: source_name} = news.source; // name of source
    const formatedDate = new Date(news.publishedAt);
    this.urlElement.href = news.url;

    // img of news
    if (news.urlToImage) {
      this.imgElement.src = news.urlToImage;
    }
    this.descriptionElement.textContent = news.description;
    this.publishedAtElement.textContent = customFormateDate(formatedDate);
    this.sourceElement.textContent = source_name;
    this.titleElement.textContent = news.title;
  }
}
export {NewsNote};
