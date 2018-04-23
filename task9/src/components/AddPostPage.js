import React from "react";
import AddPost from '../containers/AddPost'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {config} from '../config'


export default class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.islogin){
            return (
            <div>
                <h1>AddPostPage</h1>
                <h4>
                    {config.notAuthMessage} <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
                </h4>
            </div>
            )
        }
        return (
        <div>
            <h1>AddPostPage</h1>
            <AddPost/>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        islogin : state.login.isLogin,
    };
};

AddPostPage = connect(mapStateToProps)(AddPostPage);
