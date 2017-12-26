/**
 * Class controller for linkList object.
 *
 * In that class implement functions which will execute when happen some event and it will have influence for EventObserver.
 */
class LinkListController {

  /**
   * Creates an instance of linkListController.
   *
   * @constructor
   * @this {linkListController}
   * @param {object} model. Object of listModel class.
   * @param {class} view. Class with implementation of display element from list.
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  /**
   * function of initialization controller. Use to implement action in eventObserver.
   *
   * @this {linkListController}
   */
  init() {
    if(Array.isArray(this.model.list)) {
      this.model.list.forEach((link) => {
        let linkView = new this.view(link);
        const linkAction = () => {
          link.todoClick();
          linkView.render();
        };
        linkView.actionClick.subscribe(linkAction);
        linkView.render();
        this.model.domElement.appendChild(linkView.domElement);
      });
    }
  }

}

export {LinkListController};
