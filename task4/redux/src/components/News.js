import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'


export default class News extends Component {
  static propTypes = {
    news : PropTypes.array.isRequired
  };

  render(){
    const {news} = this.props;
    return (<div className={"card-group"}>
              {news.map((newsItem, index ) =>
                <NewsItem news={newsItem} key={index} />
              )}
            </div>
    )}
}


