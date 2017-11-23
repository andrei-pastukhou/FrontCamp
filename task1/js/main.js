const config = {
  'API_KEY': 'abe8dc4a8fe14125aa16bb323913586c',
  'url': 'https://newsapi.org/v2/everything', // Url without query string. Query string adds in updateNews function.
  'channelList' : [ // title => link text.
    {'title': 'ABC News', 'source': 'abc-news'},
    {'title': 'Aftenposten', 'source': 'aftenposten'},
    {'title': 'BBC News', 'source': 'bbc-news'},
    {'title': 'CNN', 'source': 'cnn'},
    {'title': 'Daily Mail', 'source': 'daily-mail'},
  ],
  'ListLinkClasses' : ['flex-sm-fill', 'text-sm-center', 'nav-link'],  //clases for link in channel choose list
};

class App {

  constructor() {
    // Use config like parametr's of app's object.
    this.API_KEY = config.API_KEY;
    this.url = config.url;
    this.channelList = config.channelList;
    this.ListLinkClasses = config.ListLinkClasses;
    // Shortcuts to DOM Elements.
    this.channelListContainer = this.getDomElement('channels_list');
    this.newsContainer = this.getDomElement('news');
  }

  // Return dom element with id. If id's element absent create new div element with necessary id.
  getDomElement(id) {
    let div = document.getElementById(id);
    if (! div) {
      div = document.createElement('div');
      div.id = id;
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
    this.channelList.forEach(function (element) {
      let {title, source} = element;
      let linkText = document.createTextNode(title);
      let a = document.createElement('a');
      a.appendChild(linkText);
      a.href = '#';
      a.setAttribute('source', source);
      a.classList.add(...this.ListLinkClasses);
      if (localStorage.getItem(element.source)) {
        a.classList.add('active');
      }
      this.channelListContainer.append(a);
      a.addEventListener('click', function (e) {
        e.preventDefault();
        this.clickChannelLink(a);
      }.bind(this));
    }.bind(this));
  }

  // Event of click on channel choose link.
  clickChannelLink(a) {
    let source = a.getAttribute('source');
    if (localStorage.getItem(source)) {
      localStorage.removeItem(source);
      a.classList.remove('active');
    } else {
      localStorage.setItem(source, a.innerHTML);
      a.classList.add('active');
    }
    this.updateNews();
  }

  // Update/redraw list of news.
  updateNews() {
    this.newsContainer.innerHTML = '';
    let sources = [];
    // Loads all the notes.
    for (let key in localStorage) {
      sources.push(key);
    }

    let source = sources.join(',');
    if (source) {
      const url = `${this.url}?sources=${source}&sortBy=publishedAt&apiKey=${this.API_KEY}`;
      let req = new Request(url);
      if(req) {
        fetch(req)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            data.articles.forEach(function (e) {
              this.drawNews(e);
            }.bind(this));
          }.bind(this));
      } else {
        alert ('sorry service is unavalibale');
      }
    }
  }

  /*
    Function create new object (NewsNote) and append it to news block.
    Input is object:
    {author: 'name of author', description : 'description', publishedAt : 'time when was publish',
        source : {id: , title},
     title: 'title of news', url: 'url to source', urlToImage: 'url to get image to news'}
  */
  drawNews(news) {
    if (news) {
      let note = document.createElement('news-note');
      note.setNews(news);
      this.newsContainer.append(note);
    }
  }
}

// Class of new html elements.
class NewsNote extends HTMLElement {
  // Fires when an instance of the element is created.
  createdCallback() {
    this.innerHTML = NewsNote.TEMPLATE;
    this.descriptionElement = this.querySelector('.card-text');
    this.publishedAtElement = this.querySelector('.publishedAt');
    this.sourceElement = this.querySelector('.source');
    this.titleElement = this.querySelector('.card-title');
    this.urlElement = this.querySelector('.btn');
    this.imgElement = this.querySelector('.card-img-top')
  }

  // Sets the parametrs of the note.
  setNews(news) {
    let {name: source_name} = news.source; // name of source
    let formated_date = new Date(news.publishedAt);
    this.urlElement.href = news.url;
    // img of news
    if (news.urlToImage) {
      this.imgElement.src = news.urlToImage;
    }
    this.descriptionElement.textContent = news.description;
    this.publishedAtElement.textContent = formated_date.format();
    this.sourceElement.textContent = source_name;
    this.titleElement.textContent = news.title;
  }
}

// Add format function to Data type.
Date.prototype.format = function (format = 'YYYY-MM-DD hh:mm') {
  let zeropad = function (number, length) {
      number = number.toString();
      length = length || 2;
      while (number.length < length)
        number = '0' + number;
      return number;
    },
    // here you can define your formats
    formats = {
      YYYY: this.getFullYear(),
      MM: zeropad(this.getMonth() + 1),
      DD: zeropad(this.getDate()),
      hh: zeropad(this.getHours()),
      mm: zeropad(this.getMinutes())
    },
    pattern = '(' + Object.keys(formats).join(')|(') + ')';

  return format.replace(new RegExp(pattern, 'g'), function (match) {
    return formats[match];
  });
};

// Initial content of the news-note element.
NewsNote.TEMPLATE = `
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
document.registerElement('news-note', NewsNote);

// Create application.
const app = new App();
// Start app after load a page.
window.addEventListener('load',  () => {app.start();});

