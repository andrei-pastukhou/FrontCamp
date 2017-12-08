const config = {
  'apiKey': 'abe8dc4a8fe14125aa16bb323913586c',
  // Url without query string. Query string adds in updateNews function.
  'url': 'https://newsapi.org/v2/everything',
  'channelList' : [ // title => link text.
    {'title': 'ABC News', 'source': 'abc-news'},
    {'title': 'Aftenposten', 'source': 'aftenposten'},
    {'title': 'BBC News', 'source': 'bbc-news'},
    {'title': 'CNN', 'source': 'cnn'},
    {'title': 'Daily Mail', 'source': 'daily-mail'},
  ],
  //clases for link in channel choose list
  'listLinkClasses' : ['flex-sm-fill', 'text-sm-center', 'nav-link'],
};

export {config};
