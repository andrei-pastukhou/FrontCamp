import { connect } from 'react-redux'
import FilterPostForm from '../components/FilterPostForm'
import {FilterPost} from '../actions';

const mapStateToProps = (state) => {
    return {
        visibilityFilter : state.visibilityFilter,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        FilterPost: author => {
            dispatch(FilterPost(author));
        }
    }
}

const Filter = connect(
mapStateToProps,
mapDispatchToProps
)(FilterPostForm)

export default Filter