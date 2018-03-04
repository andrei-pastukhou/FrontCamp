import React from 'react'
import {connect} from 'react-redux'
import {register} from '../actions'

import {render} from "react-dom";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if(this.props.pending){
      return (
        <div className="panel panel-default">
          <div className="panel-body">
            Registering ........
          </div>
        </div>);
    } else {
      return (
        <div className="panel panel-default">
          <h4>{this.props.message}</h4>
          <div className="panel-body">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="AuthorInput">Login</label>
                <input type="text" className="form-control" id="LoginInput" ref="login"/>
              </div>
              <div className="form-group">
                <label htmlFor="PostInput">Password</label>
                <input type="password" className="form-control" id="PasswordInput" ref="password"/>
              </div>
              <div className="form-group">
                <input className="btn btn-success" type="submit" value="Register"/>
              </div>
            </form>
          </div>
        </div>);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.dispatch(register(this.refs.login.value, this.refs.password.value));
    this.refs.password.value = '';
    this.refs.login.value = '';
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  //todo creade reduxer register and it's state
  return {
    message : '',
    pending : false,
  };
};

RegisterForm = connect(mapStateToProps)(RegisterForm);

export default RegisterForm
