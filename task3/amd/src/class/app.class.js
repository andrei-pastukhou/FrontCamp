class App {
  /**
   * Creates an instance of App.
   *
   * @constructor
   * @this {App}
   * @param {Object} config parameters.
   */
  constructor(config) {

    // Use config like parametr's of app's object.
    this.config = config;

    // Shortcuts to DOM Elements.
    this.channelListContainer = this.getDomElement('channels_list');
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
    let div = document.getElementById(id);
    if (!div) {
      div = document.createElement('div');
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
      a.classList.add(...this.config.listLinkClasses);
      if (localStorage.getItem(element.source)) {
        a.classList.toggle('active');
      }
      this.channelListContainer.append(a);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.clickChannelLink(a);
      });
    });
  }

  /**
   * Function call onClick event in link to select a new's channel.
   *
   * @this {App}
   * @param  {HTMLElement} a is a html link
   */
  clickChannelLink(a) {
    const source = a.getAttribute('source');
    // If source exist in localstorage then delete it, at oposite case add.
    (localStorage.getItem(source))? localStorage.removeItem(source) : localStorage.setItem(source, a.innerHTML);
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
      const req = new Request(url);
      if(req) {
        fetch(req)
          .then((response) => { return response.json();})
          .then((data) => {
            data.articles.forEach(this.drawNews.bind(this));
          });
      } else {
        alert ('sorry service is unavalibale');
      }
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
      const note = document.createElement('news-note');
      note.setNews(news);
      this.newsContainer.append(note);
    }
  }
}

export {App};
