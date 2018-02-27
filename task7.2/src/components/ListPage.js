import React from "react";
import ListPost from '../containers/listPost'

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <h1>ListPage</h1>
      <ListPost />
    </div>
    )
  }
}