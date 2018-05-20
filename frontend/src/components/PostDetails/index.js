
import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import VoteScore from '../VoteScore'
import {
    updatePostVoteScore,
    deletePost,
} from '../../actions/';

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle,
    Button
} from 'reactstrap';

class PostDetails extends Component {

    componentWillMount() {
        if (!this.props.item) {
            this.props.history.push('/error/notfound');
        }
    }

    onDownVote = (postId) => {
        this.props.dispatch(updatePostVoteScore(postId, false));
    }

    onUpVote = (postId) => {
        this.props.dispatch(updatePostVoteScore(postId, true));
    }

    onEditPost = (postId) => {

    }

    onDeletePost = (postId) => {
        this.props.dispatch(deletePost(postId));
        this.props.history.push('/');
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
                            <Button color="warning" onClick={() => this.oEditPost(post.id)}>Edit</Button>{' '}
                            <Button color="danger" onClick={() => this.onDeletePost(post.id)}>Delete</Button>
                        </CardBody>
                    </Card>)}
            </div>
        )
    }
}
export default withRouter(connect()(PostDetails));
