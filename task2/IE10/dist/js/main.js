'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import "isomorphic-fetch";

// Configuration object, use to configure the app, should be send like parametr to constructor.
var config = {
  'apiKey': 'abe8dc4a8fe14125aa16bb323913586c',

  // Url without query string. Query string adds in updateNews function.
  'url': 'https://newsapi.org/v2/everything',
  'channelList': [// title => link text.
  { 'title': 'ABC News', 'source': 'abc-news' }, { 'title': 'Aftenposten', 'source': 'aftenposten' }, { 'title': 'BBC News', 'source': 'bbc-news' }, { 'title': 'CNN', 'source': 'cnn' }, { 'title': 'Daily Mail', 'source': 'daily-mail' }],

  //clases for link in channel choose list
  'listLinkClasses': ['flex-sm-fill', 'text-sm-center', 'nav-link']
};

var App = function () {
  function App(config) {
    _classCallCheck(this, App);

    // Use config like parametr's of app's object.
    this.config = config;

    // Shortcuts to DOM Elements.
    this.channelListContainer = this.getDomElement('channels_list');
    this.newsContainer = this.getDomElement('news');
  }

  // Return dom element with id. If id's element absent create new div element with necessary id.


  _createClass(App, [{
    key: 'getDomElement',
    value: function getDomElement(id) {
      var div = document.getElementById(id);
      if (!div) {
        div = document.createElement('div');
        div.setAttribute('id', id);
        document.body.appendChild(div);
      }

      return div;
    }

    // Do first call of necessary function.

  }, {
    key: 'start',
    value: function start() {
      this.drawChannelListLink();
      this.updateNews();
    }

    // Draw links to choose the new's chanell.

  }, {
    key: 'drawChannelListLink',
    value: function drawChannelListLink() {
      var _this = this;

      this.config.channelList.forEach(function (element) {
        var _a$classList;

        var title = element.title,
            source = element.source;

        var linkText = document.createTextNode(title);
        var a = document.createElement('a');
        a.appendChild(linkText);
        a.href = '#';
        a.setAttribute('source', source);
        (_a$classList = a.classList).add.apply(_a$classList, _toConsumableArray(_this.config.listLinkClasses));
        if (localStorage.getItem(element.source)) {
          a.classList.toggle('active');
        }
        _this.channelListContainer.appendChild(a);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          _this.clickChannelLink(a);
        });
      });
    }

    /** call onClick event
     *
     * @param  {HTMLElement} a
     */

  }, {
    key: 'clickChannelLink',
    value: function clickChannelLink(a) {
      var source = a.getAttribute('source');

      // If source exist in localstorage then delete it, at oposite case add.
      localStorage.getItem(source) ? localStorage.removeItem(source) : localStorage.setItem(source, a.innerHTML);

      a.classList.toggle('active');
      this.updateNews();
    }

    // Update/redraw list of news.

  }, {
    key: 'updateNews',
    value: function updateNews() {
      var _this2 = this;

      this.newsContainer.innerHTML = '';
      var sources = [];

      // Loads all the notes.
      for (var key in localStorage) {
        sources.push(key);
      }

      var source = sources.join(',');

      if (source) {
        var url = this.config.url + '?sources=' + source + '&sortBy=publishedAt&apiKey=' + this.config.apiKey;
        //const req = new Request(url);
        //if(req) {
        fetch(url).then(function (response) {
          return response.json();
        }).then(function (data) {
          data.articles.forEach(_this2.drawNews.bind(_this2));
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

  }, {
    key: 'drawNews',
    value: function drawNews(news) {
      // Check if not empty.
      if (Object.keys(news).length !== 0) {
        var note = document.createElement('div');
        //note.innerHTML = NewsNote.TEMPLATE;
        this.setNews(note, news);
        this.newsContainer.appendChild(note);
      }
    }
  }, {
    key: 'setNews',
    value: function setNews(note, news) {
      note.innerHTML = template;
      note.descriptionElement = note.querySelector('.card-text');
      note.publishedAtElement = note.querySelector('.publishedAt');
      note.sourceElement = note.querySelector('.source');
      note.titleElement = note.querySelector('.card-title');
      note.urlElement = note.querySelector('.btn');
      note.imgElement = note.querySelector('.card-img-top');

      var source_name = news.source.name; // name of source

      var formatedDate = new Date(news.publishedAt);
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
  }]);

  return App;
}();

// Add format function to Data type.


function customFormateDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm';

  var zeropad = function zeropad(number, length) {

    // Minimum amount of character in date and time. For example const = 1 then 8 hour; const = 2 then 08 hour;
    var minNumOfCharacter = 2;
    number = number.toString();
    length = length || minNumOfCharacter;
    while (number.length < length) {
      number = '0' + number;
    }return number;
  };

  // here you can define your formats
  var formats = {
    YYYY: date.getFullYear(),
    MM: zeropad(date.getMonth() + 1),
    DD: zeropad(date.getDate()),
    hh: zeropad(date.getHours()),
    mm: zeropad(date.getMinutes())
  };
  var pattern = '(' + Object.keys(formats).join(')|(') + ')';

  return format.replace(new RegExp(pattern, 'g'), function (match) {
    return formats[match];
  });
};

// Initial content of the news-note element.
var template = '\n    <div class="card" style="width: 20rem;">\n        <img class="card-img-top">\n        <div class="card-body">\n            <h4 class="card-title"></h4>\n            <p class="card-text"></p>\n                 <p class="card-text"><small class="text-muted source"></small></p>\n                 <p class="card-text"><small class="text-muted publishedAt"></small></p>\n            <a href="#" class="btn btn-primary">Read more</a>\n        </div>\n     </div>\n';

// register news-note object
//document.registerElement('news-note', NewsNote);

// Create application.
var app = new App(config);
// Start app after load a page.
window.addEventListener('load', function () {
  app.start();
});