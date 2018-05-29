
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import VoteScore from '../VoteScore'
import {
    updatePostVoteScore,
    deletePost,
    editPost,
} from '../../actions/';

import {
    Card, CardBody,
    CardTitle, CardSubtitle,
} from 'reactstrap';

import { css } from 'aphrodite';
import styles from './styles';

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

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <VoteScore
                                id={this.props.id}
                                value={this.props.voteScore}
                                onDownVote={this.onDownVote}
                                onUpVote={this.onUpVote}
                            />
                            <span className={css(styles.title)}>{this.props.title}</span>
                        </CardTitle>
                        <CardSubtitle> <span className={css(styles.text)}>{this.props.author}</span></CardSubtitle>

                        <PostForm
                            editable={this.props.editing}
                            value={this.props.body}
                            onEdit={() => this.onEditPost(this.props.id)}
                            onCancel={() => this.onCancelEdit(this.props.id)}
                            onSave={(data) => this.onSavePost(this.props.id, data)}
                            onDelete={() => this.onDeletePost(this.props.id)}
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

    let post = ownProps.item;

    if (post) {
        title = post.title;
        body = post.body;
        author = post.author;
        voteScore = post.voteScore;
    }

    return {
        id,
        editing: action === 'edit',
        title,
        body,
        author,
        voteScore,
    }
}
export default withRouter(connect(mapStateToProps)(PostDetails));
