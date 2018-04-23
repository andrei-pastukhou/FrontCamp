import './scss/bootstrap-start-page.scss';

function component(document) {
  const button = document.getElementById('buttonStartViewNews');
  button.addEventListener('click',(e) => {
    require.ensure(['./newsAPI'], (require) => {
      let newsAPI = require('./newsAPI').default;
      newsAPI();
    });
  });
}

component(document);
