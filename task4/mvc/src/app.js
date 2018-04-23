
require ("./css/bootstrap.min.css");

import {config} from './config.js';

import {LinkModel} from './model/linkModel.js';
import {NewsModel} from './model/newsModel.js';
import {ListModel} from './model/listModel.js';

import {LinkView} from './view/linkView.js';
import {NewsView} from './view/newsView.js';

import {LinkListController} from './controller/linkListController.js';
import {NewsController} from './controller/newsController.js';


/**
 * Entry point for application.
 */

let linkList = new ListModel(LinkModel, config.channelList, {'id' : config.domId.channelList});
let linkController = new LinkListController(linkList, LinkView);
linkController.init();

let newsList = new ListModel(NewsModel, [], {'id' : config.domId.newsList});
let newsControllerObj = new NewsController(newsList, NewsView);
newsControllerObj.init();
