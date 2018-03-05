import React from "react";
import LoginForm from '../containers/Login'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <h1>LoginPage</h1>
            <LoginForm/>
        </div>
        )
    }
}
