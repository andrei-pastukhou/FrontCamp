/**
 * Class controller for linkList object.
 *
 * In that class implement functions which will execute when happen some event and it will have influence for EventObserver.
 */
class linkListController {

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
    this.model.list.forEach((link) => {
      let linkView = new this.view(link);
      linkView.actionClick.subscribe(() => {
        link.todoClick();
        linkView.render();
      });
      linkView.render();
      this.model.domElement.appendChild(linkView.domElement);
    });
  }
}

export {linkListController};
