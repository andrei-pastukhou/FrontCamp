
require ("./css/bootstrap.min.css");

// Import configuration file.
import {config} from './config.js';

// Import model's class of necessary instance.
import {linkModel} from './model/linkModel.js';
import {newsModel} from './model/newsModel.js';
import {listModel} from './model/listModel.js';

// import view's class
import {linkView} from './view/linkView.js';
import {newsView} from './view/newsView.js';

//import controller's class.
import {linkListController} from './controller/linkListController.js';
import {newsController} from './controller/newsController.js';


/**
 * Entry point for application.
 */

// Create ListModel object, and fill it with LinkModel object, and accept parameter's from config.channelList, and define id for listing result.
let linkList = new listModel(linkModel, config.channelList, {'id' : config.domId.channelList});
// Create controller to LinkList and use to display it LinkView class.
let linkController = new linkListController(linkList, linkView);
// Initialization of linkController.
linkController.init();

// Create ListModel object, and fill it with newsModel object, and accept empty array as parameter's, and define id for listing result.
let newsList = new listModel(newsModel, [], {'id' : config.domId.newsList});
// Create controller to newsList and use to display it newsView class.
let newsControllerObj = new newsController(newsList, newsView);
// Initialization of linkController.
newsControllerObj.init();





