import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewsItem extends Component {
  static propTypes = {
    news : PropTypes.object.isRequired,
  };

  render() {
    const {news} = this.props;
    //console.log(news);
     return (
       <div className={"news-note"}>
        <div className={"card"}>
          <img className={"card-img-top"} src={news.urlToImage} />
          <div className={"card-body"} >
            <h4 className={"card-title"}>{news.title}</h4>
            <p className={"card-text"}>{news.description}</p>
            <p className={"card-text"}><small className={"text-muted source"}>{news.source.name}</small></p>
            <p className={"card-text"}><small className={"text-muted publishedAt"}>{news.publishedAt}</small></p>
            <a href={news.url} className={"btn btn-primary"}>Read more</a>
          </div>
        </div>
       </div>
    );
  }
}
