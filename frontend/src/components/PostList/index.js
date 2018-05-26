
import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';

import { Table, Button } from 'reactstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import {
    getAllPosts,
    updatePostVoteScore,
    deletePost,
} from '../../actions/';

import SortTitle from '../../components/SortTitle';
import VoteScore from '../../components/VoteScore';

class PostList extends Component {

    //orderBy types
    ORDER_BY_VOTES_ASCENDING = 'ORDER_BY_VOTES_ASCENDING';
    ORDER_BY_VOTES_DESCENDING = 'ORDER_BY_VOTES_DESCENDING';
    ORDER_BY_DATE_ASCENDING = 'ORDER_BY_DATE_ASCENDING';
    ORDER_BY_DATE_DESCENDING = 'ORDER_BY_DATE_DESCENDING';

    state = {
        orderBy: null,
    }

    componentWillMount() {
        this.props.dispatch(getAllPosts(this.props.category));
    }

    componentDidUpdate(prevProps) {
        //https://stackoverflow.com/a/36190071/3395884
        if (prevProps.category !== this.props.category) {
            this.props.dispatch(getAllPosts(this.props.category));
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
    }

    onOrderBy = (orderByCriteria) => {
        this.setState({
            orderBy: orderByCriteria,
        });
    }

    orderByCriteria = (list, criteria) => {
        switch (criteria) {
            case this.ORDER_BY_DATE_ASCENDING:
                return list.sort(function (a, b) {
                    if (a.timestamp > b.timestamp) return -1;
                    if (a.timestamp < b.timestamp) return 1;
                    return 0;
                });
            case this.ORDER_BY_DATE_DESCENDING:
                return list.sort(function (a, b) {
                    if (a.timestamp < b.timestamp) return -1;
                    if (a.timestamp > b.timestamp) return 1;
                    return 0;
                });
            case this.ORDER_BY_VOTES_ASCENDING:
                return list.sort(function (a, b) {
                    if (a.voteScore > b.voteScore) return -1;
                    if (a.voteScore < b.voteScore) return 1;
                    return 0;
                });
            case this.ORDER_BY_VOTES_DESCENDING:
                return list.sort(function (a, b) {
                    if (a.voteScore < b.voteScore) return -1;
                    if (a.voteScore > b.voteScore) return 1;
                    return 0;
                });
            default:
                return list;
        }
    }

    render() {

        let posts = this.orderByCriteria(this.props.posts, this.state.orderBy);

        return (
            <div>
                <Button color="primary">New post</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>
                                <SortTitle
                                    title={"Votes"}
                                    onSortAscending={() => this.onOrderBy(this.ORDER_BY_VOTES_ASCENDING)}
                                    onSortDescending={() => this.onOrderBy(this.ORDER_BY_VOTES_DESCENDING)}
                                />
                            </th>
                            <th>Title</th>
                            <th>User</th>
                            <th>Comments</th>
                            <th>Category</th>
                            <th>
                                <SortTitle
                                    title={"Date"}
                                    onSortAscending={() => this.onOrderBy(this.ORDER_BY_DATE_ASCENDING)}
                                    onSortDescending={() => this.onOrderBy(this.ORDER_BY_DATE_DESCENDING)}
                                />
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <VoteScore
                                            id={post.id}
                                            value={post.voteScore}
                                            onDownVote={this.onDownVote}
                                            onUpVote={this.onUpVote}
                                        />
                                    </td>
                                    <td><Link to={'/posts/' + post.id}>{post.title}</Link></td>
                                    <td>{post.author}</td>
                                    <td>{post.commentCount}</td>
                                    <td>{post.category}</td>
                                    <td>{moment(post.timestamp).fromNow()}</td>
                                    <td>
                                        <Button color="warning" onClick={() => this.onEditPost(post.id)}>Edit</Button>{' '}
                                        <Button color="danger" onClick={() => this.onDeletePost(post.id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    let posts = [];

    Object.keys(state.posts).forEach(post_id => {
        let post = state.posts[post_id];
        post.id = post_id;
        posts.push(post);
    });

    return {
        posts,
    }
}
export default withRouter(connect(mapStateToProps)(PostList));