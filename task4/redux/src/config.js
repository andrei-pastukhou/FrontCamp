// Object of configuration application.
const config = {
  domId : { // Id in dom element, where will put listing of element's.
    channelList : 'channels_list',
    newsList : 'news',
  },

  apiKey : 'abe8dc4a8fe14125aa16bb323913586c', // Key to get access to new's API service.
  url : 'https://newsapi.org/v2/everything', // Url of new's API service.
  sortBy : 'publishedAt', // Parameter of sorting data from service (publishedAt  = date of publication ).
};

export {config};
