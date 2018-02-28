import React from "react";
import ListPost from '../containers/listPost'
import Filter from '../containers/Filter'

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <h1>ListPage</h1>
      <Filter />
      <ListPost />
    </div>
    )
  }
}