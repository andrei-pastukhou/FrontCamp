import {Link} from 'react-router-dom'
import React from "react";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/addPost'>addPost</Link></li>
                </ul>
            </nav>
        </header>)
    }
}
