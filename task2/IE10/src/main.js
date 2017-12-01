require('es6-promise').polyfill();
require("isomorphic-fetch");

// Configuration object, use to configure the app, should be send like parametr to constructor.
const config = {
  'apiKey': 'abe8dc4a8fe14125aa16bb323913586c',

  // Url without query string. Query string adds in updateNews function.
  'url': 'https://newsapi.org/v2/everything',
  'channelList': [ // title => link text.
    {'title': 'ABC News', 'source': 'abc-news'},
    {'title': 'Aftenposten', 'source': 'aftenposten'},
    {'title': 'BBC News', 'source': 'bbc-news'},
    {'title': 'CNN', 'source': 'cnn'},
    {'title': 'Daily Mail', 'source': 'daily-mail'},
  ],

  // Class for link in channel choose list.
  'listLinkClasses': ['flex-sm-fill', 'text-sm-center', 'nav-link'],
};

class App {
  /**
   * Creates an instance of App.
   *
   * @constructor
   * @this {App}
   * @param {Object} config parameters.
   */
  constructor(config) {

    // Use config like parameter's of app's object.
    this.config = config;

    // Shortcuts to DOM Elements.
    // noinspection JSCheckFunctionSignatures
    this.channelListContainer = this.getDomElement('channels_list');
    // noinspection JSCheckFunctionSignatures
    this.newsContainer = this.getDomElement('news');
  }

  /**
   * Return dom element with id. If id's element absent create new div element with necessary id.
   *
   * @this {App}
   * @param {text} id of html element.
   * @return {HTMLElement}
   */
  getDomElement(id) {
    // noinspection JSCheckFunctionSignatures
    let div = document.getElementById(id);
    if (!div) {
      div = document.createElement('div');
      // noinspection JSCheckFunctionSignatures

      div.setAttribute('id', id);
      document.body.appendChild(div);
    }

    return div;
  }


  /**
   * Call necessary method of App object for start working.
   *
   * @this {App}
   */

  start() {
    this.drawChannelListLink();
    this.updateNews();
  }


  /**
   * Draw links to choose the new's channel.
   *
   * @this {App}
   */

  drawChannelListLink() {
    this.config.channelList.forEach((element) => {
      const {title, source} = element;
      const linkText = document.createTextNode(title);
      const a = document.createElement('a');
      a.appendChild(linkText);
      a.href = '#';
      a.setAttribute('source', source);

      // Add all classes.
      this.config.listLinkClasses.forEach((linkClass) => {
        a.classList.add(linkClass);
      });

      if (localStorage.getItem(element.source)) {
        a.classList.toggle('active');
      }
      this.channelListContainer.appendChild(a);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.clickChannelLink(a);
      });
    })
    ;
  }

  /**
   * Function call onClick event in link to select a new's channel.
   *
   * @this {App}
   * @param  {HTMLElement} a is a html link

   */
  clickChannelLink(a) {
    const source = a.getAttribute('source');


    // If source exist in localStorage then delete it, at opposite case add.
    (localStorage.getItem(source)) ? localStorage.removeItem(source) : localStorage.setItem(source, a.innerHTML);


    a.classList.toggle('active');
    this.updateNews();
  }


  /**
   * Function to update/redraw list of news.
   *
   * @this {App}
   */

  updateNews() {
    this.newsContainer.innerHTML = '';
    const sources = [];

    // Loads all the notes.
    for (let key in localStorage) {
      sources.push(key);
    }

    const source = sources.join(',');

    if (source) {
      const url = `${this.config.url}?sources=${source}&sortBy=publishedAt&apiKey=${this.config.apiKey}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // noinspection Annotator
          data.articles.forEach(this.drawNews.bind(this));
        });

    }
  }

  /**
   * Function create new dev HTMLElement (NewsNote) and append it to news block.
   *
   * @this {App}
   * @param {Object} news is a object with next structure :
   *                {
   *                  author: 'name of author', description : 'description', publishedAt : 'time when was publish',
   *                  source : {id: , title},
   *                  title: 'title of news', url: 'url to source', urlToImage: 'url to get image to news'
   *                }
   **/
  drawNews(news) {
    // Check if not empty.
    if (Object.keys(news).length !== 0) {
      const note = document.createElement('div');
      this.setNews(note, news);
      this.newsContainer.appendChild(note);
    }
  }

  /**
   * Function set attributes to HTMLElement of note according with object's attributes.
   *
   * @this {App}
   * @param {HTMLElement} note
   * @param {Object} news is a object with next structure :
   *                {
   *                  author: 'name of author', description : 'description', publishedAt : 'time when was publish',
   *                  source : {id: , title},
   *                  title: 'title of news', url: 'url to source', urlToImage: 'url to get image to news'
   *                }
   *
   */
  setNews(note, news) {
    note.innerHTML = template;

    note.descriptionElement = note.querySelector('.card-text');
    note.publishedAtElement = note.querySelector('.publishedAt');
    note.sourceElement = note.querySelector('.source');
    note.titleElement = note.querySelector('.card-title');
    note.urlElement = note.querySelector('.btn');
    note.imgElement = note.querySelector('.card-img-top');


    const {name: source_name} = news.source; // Name of source.
    const formatedDate = new Date(news.publishedAt);
    note.urlElement.href = news.url;

    // Img of news.

    if (news.urlToImage) {
      note.imgElement.src = news.urlToImage;
    }
    note.descriptionElement.textContent = news.description;
    note.publishedAtElement.textContent = customFormateDate(formatedDate);
    note.sourceElement.textContent = source_name;
    note.titleElement.textContent = news.title;
  }

}

/**
 * Function is a utility for format date.
 *
 * @param {Date} date
 * @param {String} format
 * @return {String} formatted date according with parameter of format.
 */
function customFormateDate(date, format = 'YYYY-MM-DD hh:mm') {
  const zeropad = (number, length) => {

    // Minimum amount of character in date and time. For example const = 1 then 8 hour; const = 2 then 08 hour.
    const minNumOfCharacter = 2;
    number = number.toString();
    length = length || minNumOfCharacter;
    while (number.length < length)
      number = '0' + number;
    return number;
  };

  // Here you can define your formats.
  const formats = {
    YYYY: date.getFullYear(),
    MM: zeropad(date.getMonth() + 1),
    DD: zeropad(date.getDate()),
    hh: zeropad(date.getHours()),
    mm: zeropad(date.getMinutes())
  };
  const pattern = '(' + Object.keys(formats).join(')|(') + ')';


  return format.replace(new RegExp(pattern, 'g'), (match) => {
      return formats[match];
    }
  );

}

// Initial content of the news-note element.
let template = `

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


// Create application.
const app = new App(config);
// Start app after load a page.
window.addEventListener('load', () => {
  app.start();
});


