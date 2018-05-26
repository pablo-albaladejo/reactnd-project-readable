
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
    Button,
    FormGroup,
    Input,
} from 'reactstrap';

class PostDetails extends Component {

    state = {
        post: null,
        id: null,
        voteScore: null,
        title: null,
        author: null,
        body: null,
    }

/*     componentDidUpdate(prevProps, prevState) {
        if (prevProps.item !== prevState.post) {
            const { id, voteScore, title, author, body } = this.props.item;
            this.setState({
                post: prevProps.item,
                id,
                voteScore,
                title,
                author,
                body
            });
        }
    } */

    componentDidUpdate() {
        //has error or deleted
        if (this.props.item.error || Object.keys(this.props.item).length === 0) {
            this.props.history.push('/error/notfound');
        } else if (!this.state.post) { //to avoid recursive updates
            const { id, voteScore, title, author, body } = this.props.item;
            this.setState({
                post: {
                    id,
                    voteScore,
                    author,
                    title,
                    body,
                },
            })
        }
    }

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
    onSaveEdit = (postId, title, body) => {
        this.props.dispatch(editPost(postId, title, body));
        this.props.history.push('/posts/' + postId);
    }

    render() {
        let post = this.state.post;
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

                            {!this.props.editing && (
                                <div>
                                    <Button color="warning" onClick={() => this.onEditPost(post.id)}>Edit</Button>{' '}
                                    <Button color="danger" onClick={() => this.onDeletePost(post.id)}>Delete</Button>
                                </div>
                            )}
                            {this.props.editing && (
                                <div>
                                    <Button color="warning" onClick={() => this.onSaveEdit(this.state.id, this.state.title, this.state.body)}>Save</Button>{' '}
                                    <Button color="danger" onClick={() => this.onCancelEdit(post.id)}>Cancel</Button>
                                </div>
                            )}
                        </CardBody>
                    </Card>)}
            </div>
        )
    }
}
export default withRouter(connect()(PostDetails));
