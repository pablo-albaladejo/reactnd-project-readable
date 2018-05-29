import React, { Component } from 'react';

import {
    Card, CardBody,
} from 'reactstrap';

import moment from 'moment';

import { connect } from 'react-redux';

import VoteScore from '../VoteScore';
import {
    updateCommentVoteScore,
    deleteComment,
    updateComment,
    addComment,
} from '../../actions/comments';

import { css } from 'aphrodite';
import styles from './styles';

import CommentForm from '../Forms/CommentForm';

class CommentDetail extends Component {

    state = {
        author: null,
        body: null,
        id: null,
        voteScore: null,
    }

    onDownVote = (commentId) => {
        this.props.dispatch(updateCommentVoteScore(commentId, false));
    }

    onUpVote = (commentId) => {
        this.props.dispatch(updateCommentVoteScore(commentId, true));
    }

    onSaveComment = (commentId, data) => {
        this.props.dispatch(updateComment(commentId, data));
    }

    onDeleteComment = (commentId) => {
        this.props.dispatch(deleteComment(commentId));
    }

    onAddComment = (data) => {
        this.props.dispatch(addComment(this.props.postId, data));
    }

    render() {
        let isNew = !this.props.comment;

        let id = isNew ? -1 : this.props.comment.id;
        let voteScore = isNew ? 0 : this.props.comment.voteScore;
        let author = isNew ? null : this.props.comment.author;
        let body = isNew ? null : this.props.comment.body;
        let timestamp = isNew ? null : this.props.comment.timestamp;

        let key = this.props.index;
        
        return (
            <Card>
                <CardBody>

                    {this.props.comment && (
                        <VoteScore
                            id={id}
                            value={voteScore}
                            onDownVote={this.onDownVote}
                            onUpVote={this.onUpVote}
                        />
                    )}

                    {this.props.comment && (
                        <span className={css(styles.date)}>{"Last edit: " + moment(timestamp).format("LLL")}</span>
                    )}

                    <CommentForm
                        isNew={isNew}
                        form={'commentForm_' + key} //https://github.com/erikras/redux-form/issues/28
                        author={author}
                        value={body}
                        onSave={(data) => this.onSaveComment(id, data)}
                        onDelete={() => this.onDeleteComment(id)}
                        onAdd={(data) => this.onAddComment(data)}
                    />

                </CardBody>
            </Card>
        );
    }
}
export default connect()(CommentDetail);