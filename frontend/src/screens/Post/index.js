import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getPostById } from '../../actions/posts';
import { getAllCategories } from '../../actions/categories';

import PostDetails from '../../components/PostDetails';
import CommentList from '../../components/CommentList';

class PostScreen extends Component {

    componentWillMount() {
        let actions = [];
        
        actions.push(getAllCategories());
        if (!this.props.isNew) actions.push(getPostById(this.props.postId));

        actions.forEach(this.props.dispatch);
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

    let isNew = ownParams.match.path === '/new';

    if (state.posts.ids) {
        post = state.posts.ids[postId];
        
        if (post && post.error) {
            ownParams.history.push('/error/notfound');
        }
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