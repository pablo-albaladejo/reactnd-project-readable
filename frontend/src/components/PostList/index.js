
import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';

import { Table } from 'reactstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import {
    getAllPosts,
    updatePostVoteScore,
    deletePost,
} from '../../actions/';

import SortTitle from '../../components/SortTitle';
import VoteScore from '../../components/VoteScore';

import { css } from 'aphrodite';
import styles from './styles';

import EditButton from '../Buttons/Edit';
import DeleteButton from '../Buttons/Delete';
import NewButton from '../Buttons/New';

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
                <NewButton />
                <Table hover>
                    <thead>
                        <tr>
                            <th><span className={css(styles.title)}>#</span></th>
                            <th>
                                <SortTitle
                                    title={"Votes"}
                                    onSortAscending={() => this.onOrderBy(this.ORDER_BY_VOTES_ASCENDING)}
                                    onSortDescending={() => this.onOrderBy(this.ORDER_BY_VOTES_DESCENDING)}
                                />
                            </th>
                            <th><span className={css(styles.title)}>Title</span></th>
                            <th><span className={css(styles.title)}>User</span></th>
                            <th><span className={css(styles.title)}>Comments</span></th>
                            <th><span className={css(styles.title)}>Category</span></th>
                            <th>
                                <SortTitle
                                    title={"Date"}
                                    onSortAscending={() => this.onOrderBy(this.ORDER_BY_DATE_ASCENDING)}
                                    onSortDescending={() => this.onOrderBy(this.ORDER_BY_DATE_DESCENDING)}
                                />
                            </th>
                            <th><span className={css(styles.title)}>Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className={css(styles.table)}>
                        {posts.map((post, index) => {
                            return (
                                <tr key={index}>
                                    <td><span className={css(styles.rank)}>{index + 1}</span></td>
                                    <td>
                                        <VoteScore
                                            id={post.id}
                                            value={post.voteScore}
                                            onDownVote={this.onDownVote}
                                            onUpVote={this.onUpVote}
                                        />
                                    </td>
                                    <td><Link className={css(styles.link)} to={'/posts/' + post.id}>{post.title}</Link></td>
                                    <td><span className={css(styles.text)}>{post.author}</span></td>
                                    <td><span className={css(styles.text)}>{post.commentCount}</span></td>
                                    <td><span className={css(styles.text)}>{post.category}</span></td>
                                    <td><span className={css(styles.text)}>{moment(post.timestamp).fromNow()}</span></td>
                                    <td>
                                        <EditButton onClick={() => this.onEditPost(post.id)} />{' '}
                                        <DeleteButton onClick={() => this.onDeletePost(post.id)} />
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

    if (!state.posts.isFetching) {
        Object.keys(state.posts.ids).forEach(post_id => {
            let post = state.posts.ids[post_id];
            post.id = post_id;
            posts.push(post);
        });
    }

    return {
        posts,
    }
}
export default withRouter(connect(mapStateToProps)(PostList));