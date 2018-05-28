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
                    editing={this.props.action === 'edit'}
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
    let action = ownParams.match.params.action;

    if (state.posts.ids) {
        post = state.posts.ids[postId];
    }

    //comments
    let comments = [];
    if (!state.posts.isFetching) {
        Object.keys(state.comments.ids).forEach(key => {
            let comment = state.comments.ids[key];
            comment.id = key;
            comments.push(comment);
        });
    }

    return {
        post,
        comments,
        action,
    }
}
export default connect(mapStateToProps)(PostScreen);