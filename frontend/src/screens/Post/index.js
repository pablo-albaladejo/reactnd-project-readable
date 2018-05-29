import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getPostById } from '../../actions/posts';
import { getAllCategories } from '../../actions/categories';

import PostDetails from '../../components/PostDetails';
import CommentList from '../../components/CommentList';

class PostScreen extends Component {

    componentWillMount() {
        if (!this.props.isNew) this.props.dispatch(getPostById(this.props.postId));
        this.props.dispatch(getAllCategories());
    }

    render() {
        return (
            <div>
                <PostDetails
                    post={this.props.post}
                    categories={this.props.categories}
                    editing={this.props.action === 'edit'}
                    isNew={this.props.isNew}
                />
                {!this.props.isNew && (
                    <CommentList
                        postId={this.props.postId}
                        item={this.props.comments}
                    />
                )}
            </div>
        );
    }
}
function mapStateToProps(state, ownParams) {
    //post
    let post = {};

    let postId = ownParams.match.params.id;
    let action = ownParams.match.params.action;

    let isNew = postId === 'new';

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

    let categories = [];
    if (!state.categories.isFetching) {
        Object.keys(state.categories.ids).forEach(key => {
            let category = state.categories.ids[key];
            category.id = key;
            categories.push(category);
        });
    }

    return {
        post,
        postId,
        isNew,
        comments,
        categories,
        action,
    }
}
export default connect(mapStateToProps)(PostScreen);