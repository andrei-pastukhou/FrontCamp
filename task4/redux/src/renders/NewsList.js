import {config} from '../config';

// Function to visualization news. newsList is array from store.news
function render(store) {
  let newsList = store.getState().news;
  document.getElementById(config.domId.newsList).innerHTML = "";
  newsList.forEach((news)=> {
    // Create a new DomElement and fill it with data from newsList.
    let domElement = document.createElement('div');
    domElement.innerHTML = `
      <div class="card" style="width: 20rem;">
        <img class="card-img-top">
        <div class="card-body">
          <h4 class="card-title"></h4>
          <p class="card-text"></p>
          <p class="card-text"><small class="text-muted source"></small></p>
          <p class="card-text"><small class="text-muted publishedAt"></small></p>
          <a href="#" class="btn btn-primary">Read more</a>
        </div>
      </div>`;
    const {name: source_name} = news.source; // Name of source.
    domElement.querySelector('.card-text').textContent = news.description;
    domElement.querySelector('.publishedAt').textContent = news.publishedAt;
    domElement.querySelector('.source').textContent = source_name;
    domElement.querySelector('.card-title').textContent = news.title;
    domElement.querySelector('.btn').href = news.url;
    if (news.urlToImage) {
      domElement.querySelector('.card-img-top').src = news.urlToImage;
    }
    document.getElementById(config.domId.newsList).appendChild(domElement);
  });
}

export {render};
