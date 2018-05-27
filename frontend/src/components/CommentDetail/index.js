import React, { Component } from 'react';

import {
    Card, CardBody,
    CardSubtitle,
    FormGroup, Input
} from 'reactstrap';

import { connect } from 'react-redux';

import VoteScore from '../VoteScore';
import {
    updateCommentVoteScore,
    deleteComment
} from '../../actions/';

import EditButton from '../Buttons/Edit';
import DeleteButton from '../Buttons/Delete';

import { css } from 'aphrodite';
import styles from './styles';

class CommentDetail extends Component {

    state = {
        author: null,
        body: null,
        id: null,
        voteScore: null,
    }

    componentWillMount() {
        this.setState({
            author: this.props.comment.author,
            body: this.props.comment.body,
            id: this.props.comment.id,
            voteScore: this.props.comment.voteScore,
        });
    }

    onDownVote = (commentId) => {
        this.props.dispatch(updateCommentVoteScore(commentId, false));
    }

    onUpVote = (commentId) => {
        this.props.dispatch(updateCommentVoteScore(commentId, true));
    }

    oEditComment = (commentId) => {

    }

    onDeleteComment = (commentId) => {
        this.props.dispatch(deleteComment(commentId));
    }

    render() {

        return (
            <Card>
                <CardBody>

                    <VoteScore
                        id={this.state.id}
                        value={this.state.voteScore}
                        onDownVote={this.onDownVote}
                        onUpVote={this.onUpVote}
                    />

                    <CardSubtitle><span className={css(styles.text)}>{this.state.author}</span></CardSubtitle>
                    
                    <FormGroup>
                        <Input
                            readOnly={!this.props.editing}
                            type="textarea"
                            name="postBody"
                            id="postBody"
                            value={this.state.body}
                            onChange={(event) => {
                                this.setState({
                                    body: event.target.value,
                                })
                            }}
                        />
                    </FormGroup>

                    <div>
                        <EditButton onClick={() => this.oEditComment(this.state.id)} />{' '}
                        <DeleteButton onClick={() => this.onDeleteComment(this.state.id)} />
                    </div>
                </CardBody>
            </Card>
        );
    }
}
export default connect()(CommentDetail);