import React from "react";
import ListPost from '../containers/listPost'
import Filter from '../containers/Filter'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {config} from '../config'

let ListPage = ({isLogin}) => {
    if(!isLogin) {
        return (
            <div>
                <h1>ListPage</h1>
                <h4>
                    {config.notAuthMessage} <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
                </h4>
            </div>
        )
    }
    return (
        <div>
            <h1>ListPage</h1>
            <Filter />
            <ListPost />
        </div>
    )
};

const mapStateToProps = (state) => ({
    isLogin : state.login.isLogin
});

ListPage = connect(mapStateToProps)(ListPage);

export default ListPage;
