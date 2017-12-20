import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Channels from '../components/Channels'
import News from '../components/News'
import * as appActions from '../actions'


const App = ({ channels, news, actions}) => (
  <div>
    <Channels channels={channels} actions={actions}/>
    <News news={news} actions={actions} />
  </div>
);



App.propTypes = {
  channels: PropTypes.array.isRequired,
  news: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  channels: state.channels,
  news: state.news,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch),
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


// const App = ({channels, actions}) => (
//   <div>
//     <Channels channels={store.getState().channels} actions={actions}/>
//     <News channels={store.getState().channels} />
//   </div>
// );
