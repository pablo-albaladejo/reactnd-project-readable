
import React, { Component } from 'react';

import {
    Card, CardText, CardBody,
    CardSubtitle,
} from 'reactstrap';

import { connect } from 'react-redux';

import VoteScore from '../VoteScore';
import {
    updateCommentVoteScore,
} from '../../actions/';

class CommentList extends Component {

    onDownVote = (commentId) => {
        this.props.dispatch(updateCommentVoteScore(commentId, false));
    }

    onUpVote = (commentId) => {
        this.props.dispatch(updateCommentVoteScore(commentId, true));
    }

    render() {
        let comments = this.props.item;
        return (
            <div>
                {comments.map((comment, index) => {
                    return (
                        <Card key={index}>
                            <CardBody>
                                <CardSubtitle>{comment.author}</CardSubtitle>
                                <CardText>
                                    {comment.body}
                                </CardText>
                                <VoteScore
                                    id={comment.id}
                                    value={comment.voteScore}
                                    onDownVote={this.onDownVote}
                                    onUpVote={this.onUpVote}
                                />
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        );
    }
}
export default connect()(CommentList);