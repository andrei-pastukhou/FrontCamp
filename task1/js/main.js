class App {
  //====================================================================================================================
  constructor() {
    this.API_KEY = 'abe8dc4a8fe14125aa16bb323913586c';
    this.url = 'https://newsapi.org/v2/everything'; // Url without query string. Query string adds in update_news function.
    this.channel_list = [ // title => link text.
      {'title':'ABC News', 'source':'abc-news'},
      {'title':'Aftenposten', 'source':'aftenposten'},
      {'title':'BBC News', 'source':'bbc-news'},
      {'title':'CNN', 'source':'cnn'},
      {'title':'Daily Mail', 'source':'daily-mail'},
    ];
    // Shortcuts to DOM Elements.
    this.channel_list_container = document.getElementById('channels_list');
    this.news_container = document.getElementById('news');
    // First call function to init.
    this.draw_channel_list_link();
    this.update_news();
  }
  //====================================================================================================================
  // Draw links to choose the new's chanell.
  draw_channel_list_link() {
    this.channel_list.forEach( function(element){
      let {title,source} = element;
      let linkText = document.createTextNode(title);
      let a = document.createElement('a');
      a.appendChild(linkText);
      a.href = '#';
      a.setAttribute('source', source);
      a.classList.add(...ListLinkClasses);
      if(localStorage.getItem(element.source)){
        a.classList.add('active');
      }
      this.channel_list_container.append(a);
      a.addEventListener('click', function(e){ e.preventDefault(); this.channel_link_click(a);}.bind(this));
    }.bind(this));
  }
  //====================================================================================================================
  // Event of click on channel choose link.
  channel_link_click(a) {
    let source = a.getAttribute('source');
    if(localStorage.getItem(source)){
      localStorage.removeItem(source);
      a.classList.remove('active');
    }else{
      localStorage.setItem(source, a.innerHTML);
      a.classList.add('active');
    }
    this.update_news(); // update/redraw list of news.
  }
  //====================================================================================================================
  update_news() {
    this.news_container.innerHTML = '';
    var sources = [];
    // Loads all the notes.
    for (let key in localStorage) {
      sources.push(key);
    }
    let source = sources.join(',');
    if(source) {
      let url = this.url + '?' + `sources=${source}` + `&sortBy=publishedAt&apiKey=${this.API_KEY}`;
      let req = new Request(url);
      fetch(req).then(function (response) {
          response.json().then(function (data) {
              data.articles.forEach(function (e) {
                this.draw_news(e);
              }.bind(this));
          }.bind(this));
      }.bind(this))
    }
  }
  //====================================================================================================================
  draw_news(news) {
    if (news) {
      let note = document.createElement('news-note');
      note.setNews(news);
      this.news_container.append(note);
    }
  }
}

// Class of new html elements.
class NewsNote extends HTMLElement {
  //====================================================================================================================
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
  //====================================================================================================================
  // Sets the message of the note.
  setNews(news) {
    let {name : source_name} = news.source; // name of source
    let formated_date = new Date(news.publishedAt);
    this.urlElement.href =  news.url;
    // img of news
    if(news.urlToImage) {
      this.imgElement.src = news.urlToImage;
    }
    this.descriptionElement.textContent = news.description;
    this.publishedAtElement.textContent = formated_date.format();
    this.sourceElement.textContent = source_name;
    this.titleElement.textContent = news.title;
  }
}

// Add format function to Data type.
Date.prototype.format = function(format = 'YYYY-MM-DD hh:mm') {
  let zeropad = function(number, length) {
      number = number.toString();
      length = length || 2;
      while(number.length < length)
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

  return format.replace(new RegExp(pattern, 'g'), function(match) {
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
//clases for link in channel choose list
ListLinkClasses = ['flex-sm-fill', 'text-sm-center', 'nav-link'];

// register news-note object
document.registerElement('news-note', NewsNote);

// Start app after load a page.
window.addEventListener('load', () => new App());

