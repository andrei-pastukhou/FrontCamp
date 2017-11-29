
//import "isomorphic-fetch";

// Configuration object, use to configure the app, should be send like parametr to constructor.
const config = {
  'apiKey': 'abe8dc4a8fe14125aa16bb323913586c',

  // Url without query string. Query string adds in updateNews function.
  'url': 'https://newsapi.org/v2/everything',
  'channelList' : [ // title => link text.
    {'title': 'ABC News', 'source': 'abc-news'},
    {'title': 'Aftenposten', 'source': 'aftenposten'},
    {'title': 'BBC News', 'source': 'bbc-news'},
    {'title': 'CNN', 'source': 'cnn'},
    {'title': 'Daily Mail', 'source': 'daily-mail'},
  ],

  //clases for link in channel choose list
  'listLinkClasses' : ['flex-sm-fill', 'text-sm-center', 'nav-link'],
};

class App {

  constructor(config) {

    // Use config like parametr's of app's object.
    this.config = config;

    // Shortcuts to DOM Elements.
    this.channelListContainer = this.getDomElement('channels_list');
    this.newsContainer = this.getDomElement('news');
  }

  // Return dom element with id. If id's element absent create new div element with necessary id.
  getDomElement(id) {
   let div = document.getElementById(id);
    if (!div) {
      div = document.createElement('div');
      div.setAttribute('id', id);
      document.body.appendChild(div);
    }

    return div;
  }

  // Do first call of necessary function.
  start() {
    this.drawChannelListLink();
    this.updateNews();
  }

  // Draw links to choose the new's chanell.
  drawChannelListLink() {
    this.config.channelList.forEach((element) => {
      const {title, source} = element;
      const linkText = document.createTextNode(title);
      const a = document.createElement('a');
      a.appendChild(linkText);
      a.href = '#';
      a.setAttribute('source', source);
      a.classList.add(...this.config.listLinkClasses);
      if (localStorage.getItem(element.source)) {
        a.classList.toggle('active');
      }
      this.channelListContainer.appendChild(a);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.clickChannelLink(a);
      });
    });
  }

  /** call onClick event
   *
   * @param  {HTMLElement} a
   */
  clickChannelLink(a) {
    const source = a.getAttribute('source');

    // If source exist in localstorage then delete it, at oposite case add.
    (localStorage.getItem(source))? localStorage.removeItem(source) : localStorage.setItem(source, a.innerHTML);

    a.classList.toggle('active');
    this.updateNews();
  }

  // Update/redraw list of news.
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
      //const req = new Request(url);
      //if(req) {
        fetch(url)
          .then((response) => { return response.json();})
          .then((data) => {
            data.articles.forEach(this.drawNews.bind(this));
          });
      //} else {
      //  alert ('sorry service is unavalibale');
     // }
    }
  }

  /**
   * Function create new object (NewsNote) and append it to news block.
   *
   * @param 'news' is object:
   * {author: 'name of author', description : 'description', publishedAt : 'time when was publish',
   *     source : {id: , title},
   *  title: 'title of news', url: 'url to source', urlToImage: 'url to get image to news'}
  **/
  drawNews(news) {
    // Check if not empty.
    if (Object.keys(news).length !== 0) {
	  const note = document.createElement('div');
	  //note.innerHTML = NewsNote.TEMPLATE;
      this.setNews(note,news);
      this.newsContainer.appendChild(note);
    }
  }
  
  setNews(note, news) {
	note.innerHTML = template;
    note.descriptionElement = note.querySelector('.card-text');
    note.publishedAtElement = note.querySelector('.publishedAt');
    note.sourceElement = note.querySelector('.source');
    note.titleElement = note.querySelector('.card-title');
    note.urlElement = note.querySelector('.btn');
    note.imgElement = note.querySelector('.card-img-top');
	
	const {name: source_name} = news.source; // name of source
    const formatedDate = new Date(news.publishedAt);
    note.urlElement.href = news.url;

    // img of news
    if (news.urlToImage) {
      note.imgElement.src = news.urlToImage;
    }
    note.descriptionElement.textContent = news.description;
    note.publishedAtElement.textContent = customFormateDate(formatedDate);
    note.sourceElement.textContent = source_name;
    note.titleElement.textContent = news.title;
  }
  
}


// Add format function to Data type.
function customFormateDate (date, format = 'YYYY-MM-DD hh:mm') {
  const zeropad = (number, length) => {

    // Minimum amount of character in date and time. For example const = 1 then 8 hour; const = 2 then 08 hour;
      const minNumOfCharacter = 2;
      number = number.toString();
      length = length || minNumOfCharacter;
      while (number.length < length)
        number = '0' + number;
      return number;
    };

    // here you can define your formats
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
};

// Initial content of the news-note element.
var template = `
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

// register news-note object
//document.registerElement('news-note', NewsNote);

// Create application.
const app = new App(config);
// Start app after load a page.
window.addEventListener('load',  () => {app.start();});

