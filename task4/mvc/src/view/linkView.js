import {EventObserver} from "../model/eventObserverModel";

class interfaceView {
  constructor() {
    this.domElement = null;
  }
  render() {};
}


/**
 * Class implement view logic to linkModel class.
 */
class linkView extends interfaceView {
  /**
   * Creates an instance of linkView.
   *
   * @constructor
   * @this {linkView}
   * @param {object} model. This view's logic for this object.
   */
  constructor(model) {
    super();
    this.model = model;
    this.actionClick = new EventObserver();
    this.clases = ['flex-sm-fill', 'text-sm-center', 'nav-link'];
    this.init();
  }

  /**
   * Function of initialization view. At this function create all necessary object (like a rule HTMLElement) and fill
   * attribute's in that view object. Also add event listener's, and connect event and action with eventObserver
   *
   * @this {linkView}
   */
  init() {
    this.domElement = document.createElement('a');
    this.domElement.appendChild(document.createTextNode(this.model.title));
    this.domElement.href = '#';
    this.clases.forEach((linkClass) => {
      this.domElement.classList.add(linkClass);
    });
    this.domElement.setAttribute('source', this.model.source);
    this.domElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.actionClick.broadcast();
    });
  }

  /**
   * Function to change visualization of created object.
   *
   * @this {linkView}
   */
  render() {
    if(this.model.selected) {
      this.domElement.classList.add('active');
    } else {
      this.domElement.classList.remove('active');
    }
  }
}

export {linkView};
