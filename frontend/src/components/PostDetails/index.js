
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
    FormGroup,
    Input,
} from 'reactstrap';

import { css } from 'aphrodite';
import styles from './styles';
import EditButton from '../Buttons/Edit';
import DeleteButton from '../Buttons/Delete';
import CancelButton from '../Buttons/Cancel';
import SaveButton from '../Buttons/Save';

class PostDetails extends Component {

    state = {
        post: null,
        id: null,
        voteScore: null,
        title: null,
        author: null,
        body: '',
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
                body
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
                                <span className={css(styles.title)}>{post.title}</span>
                            </CardTitle>
                            <CardSubtitle> <span className={css(styles.text)}>{post.author}</span></CardSubtitle>

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
                                    <EditButton onClick={() => this.onEditPost(post.id)} />{' '}
                                    <DeleteButton onClick={() => this.onDeletePost(post.id)} />
                                </div>
                            )}
                            {this.props.editing && (
                                <div>

                                    <SaveButton onClick={() => this.onSaveEdit(this.state.id, this.state.title, this.state.body)} />{' '}
                                    <CancelButton onClick={() => this.onCancelEdit(post.id)} />
                                </div>
                            )}
                        </CardBody>
                    </Card>)}
            </div>
        )
    }
}
export default withRouter(connect()(PostDetails));
