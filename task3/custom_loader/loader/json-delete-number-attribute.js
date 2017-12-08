//Loader use to deleting all numeric attributes in json object
module.exports = function jsonDeleteNumberAttribute(source) {

  // function recursive iteration of each attribute and deleting all attribute with numeric name.
  function traverse(obj) {
    let item;
    for (let key in obj) {
      if(isFinite(key)){
        delete(obj[key]);
      }
      item = obj[key];
      if (typeof item === 'object') {
        traverse(item);
      }
    }
  }

  let obj = JSON.parse(source);
  traverse(obj);
  source = JSON.stringify(obj);

  return source;
};
