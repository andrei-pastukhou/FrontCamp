import React from "react";
import AddPost from '../containers/AddPost'

export default class AddPostPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <h1>AddPostPage</h1>
      <AddPost />
    </div>
    )
  }
}