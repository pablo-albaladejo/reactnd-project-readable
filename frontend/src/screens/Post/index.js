import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPostById } from '../../actions/';

import PostDetails from '../../components/PostDetails';
import CommentList from '../../components/CommentList';

class PostScreen extends Component {

    componentWillMount() {
        let postId = this.props.match.params.id;
        this.props.dispatch(getPostById(postId));
    }

    render() {
        return (
            <div>
                <PostDetails
                    item={this.props.post}
                />
                <CommentList
                    item={this.props.comments}
                />
            </div>
        );
    }
}
function mapStateToProps(state, ownParams) {
    //post
    let post = {};
    let postId = ownParams.match.params.id;
    if (state.posts) {
        post = state.posts[postId];
    }

    //comments
    let comments = [];
    if(state.comments.length > 0){
        comments = state.comments;
    }
    
    return {
        post,
        comments,
    }
}
export default connect(mapStateToProps)(PostScreen);