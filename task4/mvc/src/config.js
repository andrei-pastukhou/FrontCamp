// Object of configuration application.
const config = {
  channelList : [ // title => link text. List of available channel to get news.
    {'title' : 'ABC News', 'source': 'abc-news'},
    {'title' : 'Aftenposten', 'source': 'aftenposten'},
    {'title' : 'BBC News', 'source': 'bbc-news'},
    {'title' : 'CNN', 'source': 'cnn'},
    {'title' : 'Daily Mail', 'source': 'daily-mail'},
  ],
  domId : { // Id in dom element, where will put listing of element's.
    channelList : 'channels_list',
    newsList : 'news',
  },

  apiKey : 'abe8dc4a8fe14125aa16bb323913586c', // Key to get access to new's API service.
  url : 'https://newsapi.org/v2/everything', // Url of new's API service.
  sortBy : 'publishedAt', // Parameter of sorting data from service (publishedAt  = date of publication ).

  keyWord : 'channel', // Key word for identify own's record in a storage.
};

export {config};
