
class interfaceView {
  constructor() {
    this.domElement = null;
  }
  render() {};
}

/**
 * Class implement view logic to newsModel class.
 */
class newsView extends interfaceView {
  /**
   * Creates an instance of linkView.
   *
   * @constructor
   * @this {newsView}
   * @param {object} model. This view's logic for this object.
   */
  constructor(model) {
    super();
    this.model = model;
    this.domElement = null;
  }

  /**
   * Function create visualization of model.
   * @this {newsView}
   */
  render() {
    // Create a new DomElement and fill it with data from model (newsModel).
    this.domElement = document.createElement('div');
    this.domElement.innerHTML = `
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
    const {name: source_name} = this.model.source; // Name of source.
    this.domElement.querySelector('.card-text').textContent = this.model.description;
    this.domElement.querySelector('.publishedAt').textContent = this.model.publishedAt;
    this.domElement.querySelector('.source').textContent = source_name;
    this.domElement.querySelector('.card-title').textContent = this.model.title;
    this.domElement.querySelector('.btn').href = this.model.url;
    if (this.model.urlToImage) {
      this.domElement.querySelector('.card-img-top').src =this.model.urlToImage;
    }
  }
}

export {newsView};
