import React, { Component } from 'react';

import {
    Card, CardBody,
    CardSubtitle,
} from 'reactstrap';

import { connect } from 'react-redux';

import VoteScore from '../VoteScore';
import {
    updateCommentVoteScore,
    deleteComment,
    updateComment,
} from '../../actions/';

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

    render() {
        const { id, voteScore, author, body } = this.props.comment;
        let key = this.props.index;
        return (
            <Card>
                <CardBody>

                    <VoteScore
                        id={id}
                        value={voteScore}
                        onDownVote={this.onDownVote}
                        onUpVote={this.onUpVote}
                    />

                    <CardSubtitle><span className={css(styles.text)}>{author}</span></CardSubtitle>

                    <CommentForm
                        form={'commentForm_' + key} //https://github.com/erikras/redux-form/issues/28

                        value={body}
                        onSave={(data) => this.onSaveComment(id, data)}
                        onDelete={() => this.onDeleteComment(id)}
                    />

                </CardBody>
            </Card>
        );
    }
}
export default connect()(CommentDetail);