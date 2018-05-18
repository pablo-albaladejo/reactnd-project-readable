
import React, { Component } from 'react';

import { connect } from 'react-redux';

import VoteScore from '../VoteScore'
import {
    updatePostVoteScore,
} from '../../actions/';

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle,
    //Button
} from 'reactstrap';

class PostDetails extends Component {

    onDownVote = (postId) => {
        this.props.dispatch(updatePostVoteScore(postId, false));
    }

    onUpVote = (postId) => {
        this.props.dispatch(updatePostVoteScore(postId, true));
    }

    render() {
        let post = this.props.item;
        return (
            <div>
                {post && (
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <VoteScore
                                    id={post.id}
                                    value={post.voteScore}
                                    onDownVote={this.onDownVote}
                                    onUpVote={this.onUpVote}
                                />
                                {post.title}
                            </CardTitle>
                            <CardSubtitle>{post.author}</CardSubtitle>
                            <CardText>{post.body}</CardText>
                            {/* <Button>Button</Button> */}
                        </CardBody>
                    </Card>
                )}
            </div>
        );
    }
}
export default connect()(PostDetails);
