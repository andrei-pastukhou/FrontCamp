import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class ChannelsLinkItem extends Component {
  static propTypes = {
    channel : PropTypes.object.isRequired,
    id : PropTypes.number.isRequired,
    clickLink : PropTypes.func.isRequired,
   };


  Click = () => {
    let newState =  !this.props.channels[this.props.id].selected;
    this.props.clickLink(this.props.id,newState);
    this.props.fetchAllNewsFromServer();

  };

  render() {
    const {channel} = this.props;
    let linkClass = 'flex-sm-fill text-sm-center nav-link';
    if(this.props.channels[this.props.id].selected){
      linkClass += ' active';
    }
    let element;
    element = (
      <a href="" className={linkClass}
         onClick={e => {
           e.preventDefault();
           this.Click();
         }}
         >{channel.title}</a>
    );
    return (
        <p>
          {element}
        </p>
    )
  }
}
