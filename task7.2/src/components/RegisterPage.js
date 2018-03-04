import React from "react";
import RegisterForm from '../containers/Register'

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>RegisterPage</h1>
        <RegisterForm />
      </div>
    )
  }
}