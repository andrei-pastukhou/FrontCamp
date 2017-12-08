import './scss/bootstrap-start-page.scss';

function component() {
  const element = document.createElement('div');
  const button = document.getElementById('buttonStartViewNews');
  button.onclick = (e) => {
    require.ensure(['./newsAPI'], (require) => {
      let newsAPI = require('./newsAPI').default;
      newsAPI();
   });
  };
  return element;
}

document.getElementById('news').appendChild(component());
