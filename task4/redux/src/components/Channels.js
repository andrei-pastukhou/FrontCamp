import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChannelsLinkItem from './ChannelsLinkItem'

export default class Channels extends Component {
  static propTypes = {
    channels : PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };


  render() {
    const {channels, actions} = this.props;
    return (
      <div className="container d-flex p-2">
        <nav className="nav nav-pills flex-column flex-sm-row" id="channels_list">
          {channels.map((channel, index, channelsArray) =>
            <ChannelsLinkItem key={index} id={index} channel={channel} channels={channels}  {...actions} />
          )}
        </nav>
      </div>
    )
  }
}

