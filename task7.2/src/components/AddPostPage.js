import React from "react";
import AddPost from '../containers/AddPost'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {config} from '../config'


let AddPostPage = ({isLogin}) => {
    if(!isLogin) {
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
};

const mapStateToProps = (state) => ({
    isLogin: state.login.isLogin,
});

AddPostPage = connect(mapStateToProps)(AddPostPage);

export default AddPostPage;
