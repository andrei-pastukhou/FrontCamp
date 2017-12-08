import {config} from './config.js';
import {App} from './class/app.class.js';
import {NewsNote} from './class/newsNote.class.js';
import './scss/bootstrap.scss';

export default () => {
  // register news-note object
  document.registerElement('news-note', NewsNote);
  // Create application.
  const app = new App(config);
  // Start app after load a page.
  app.start();
}
