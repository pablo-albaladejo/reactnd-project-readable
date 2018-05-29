
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import VoteScore from '../VoteScore'
import {
    updatePostVoteScore,
    deletePost,
    editPost,
    addPost,
} from '../../actions/';

import {
    Card, CardBody,
    CardTitle,
} from 'reactstrap';

import { css } from 'aphrodite';
import styles from './styles';

import moment from 'moment';

import PostForm from '../Forms/PostForm';

class PostDetails extends Component {

    onDownVote = (postId) => {
        this.props.dispatch(updatePostVoteScore(postId, false));
    }

    onUpVote = (postId) => {
        this.props.dispatch(updatePostVoteScore(postId, true));
    }

    onEditPost = (postId) => {
        this.props.history.push('/posts/' + postId + '/edit');
    }

    onDeletePost = (postId) => {
        this.props.dispatch(deletePost(postId));
        this.props.history.push('/');
    }

    onCancelEdit = (postId) => {
        this.props.history.push('/posts/' + postId);
    }
    onSavePost = (postId, data) => {
        this.props.dispatch(editPost(postId, data.title, data.body));
        this.props.history.push('/posts/' + postId);
    }
    onAddPost = (data) => {
        let post = {
            title: data.title,
            body: data.body,
            author: data.author,
            category: this.props.categories[data.category].path,
        }

        this.props.dispatch(addPost(post));
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>

                            {!this.props.isNew && (
                                <VoteScore
                                    id={this.props.id}
                                    value={this.props.voteScore}
                                    onDownVote={this.onDownVote}
                                    onUpVote={this.onUpVote}
                                />
                            )}

                            {!this.props.isNew && (
                                <span className={css(styles.date)}>{"Last edit: " + moment(this.props.timestamp).format("LLL")}</span>
                            )}

                        </CardTitle>
                        <PostForm
                            editable={this.props.editing}
                            isNew={this.props.isNew}
                            title={this.props.title}
                            author={this.props.author}
                            value={this.props.body}
                            category={this.props.category}
                            categories={this.props.categories}
                            onEdit={() => this.onEditPost(this.props.id)}
                            onCancel={() => this.onCancelEdit(this.props.id)}
                            onSave={(data) => this.onSavePost(this.props.id, data)}
                            onDelete={() => this.onDeletePost(this.props.id)}
                            onAdd={(data) => this.onAddPost(data)}
                        />

                    </CardBody>
                </Card>
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    let { id, action } = ownProps.match.params;

    let title = '';
    let body = '';
    let author = '';
    let voteScore = 0;
    let timestamp = 0;
    let category = -1;

    let post = ownProps.post;
    let categories = ownProps.categories;

    if (post) {
        title = post.title;
        body = post.body;
        author = post.author;
        voteScore = post.voteScore;
        timestamp = post.timestamp;
    }

    if (categories && post) {
        var found = categories.find(category => {
            return category.path === post.category
        });
        if (found) category = found.id;
    }

    return {
        id,
        editing: action === 'edit',
        title,
        body,
        author,
        voteScore,
        timestamp,
        category,
        categories,
    }
}
export default withRouter(connect(mapStateToProps)(PostDetails));
