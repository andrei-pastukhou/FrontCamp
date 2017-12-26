/**
 * This class implement structure pattern factory.
 * Class implement model of list object's .
 */
class ListModel{

  /**
   * Creates an instance of listModel.
   *
   * @constructor
   * @this {listModel}
   * @param {class} childClass. class of object's model. example: linkModel, newsModel.
   * @param {array} modelsArray. array with data to model of childClass. According with type of  childClass structure of
   *  object inside array can be different.
   * @param {object} options. Object with parameter's to list model. Give it from config. example {id: id_element_of_dom}
   *  use to define dom element where will put a listing of this list.
   */
  constructor(childClass, modelsArray, options) {
    this.childClass = childClass;
    this.list = [];
    if(Array.isArray(modelsArray) && (modelsArray.length > 0)) {
      modelsArray.forEach((parameter) => {
        this.list.push(new childClass(parameter));
      });
    }
    this.options = options;
    this.domElement = this.getDomElement(this.options.id);
  }

  /**
   * Return dom element with id. If id's element absent create new div element with necessary id.
   *
   * @this {listModel}
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
   * Update (before delete than paste) object's list (this.list) with new object of this.childClass class according with
   * array data. (array data is containers of parameters fore each object)
   *
   * @this {listModel}
   * @param {array} data
   */
  updateData(data) {
    this.list = [];
    if(Array.isArray(data) && (data.length > 0)) {
      data.forEach((parameter) => {
        this.list.push(new this.childClass(parameter));
      });
    }
  }
}

export {ListModel};
