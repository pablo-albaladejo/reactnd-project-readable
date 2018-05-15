
import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';

import { Table, Button } from 'reactstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import {
    getAllPosts,
} from '../../actions/';

import SortTitle from '../../components/SortTitle';
import VoteScore from '../../components/VoteScore';

class PostList extends Component {

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
        console.log("post " + postId + " downvote");
    }

    onUpVote = (postId) => {
        console.log("post " + postId + " upvote");
    }

    onVotesSortAscending = () => {
        console.log("sort votes ascending");
    }
    onVotesSortDescending = () => {
        console.log("sort votes descending");
    }

    onDateSortAscending = () => {
        console.log("sort date ascending");
    }
    onDateSortDescending = () => {
        console.log("sort date descending");
    }

    render() {
        return (
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <SortTitle
                                title={"Votes"}
                                onSortAscending={this.onVotesSortAscending}
                                onSortDescending={this.onVotesSortDescending}
                            />
                        </th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Comments</th>
                        <th>Category</th>
                        <th>
                            <SortTitle
                                title={"Date"}
                                onSortAscending={this.onDateSortAscending}
                                onSortDescending={this.onDateSortDescending}
                            />
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.posts.map((post, index) => {
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
                                    <Button color="warning">Edit</Button>{' '}<Button color="danger">Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}
function mapStateToProps(state, ownProps) {
    let posts = [];

    Object.keys(state.posts).forEach(post_id => {
        let post = state.posts[post_id];
        posts.push(post);
    });

    return {
        posts,
    }
}
export default withRouter(connect(mapStateToProps)(PostList));
//onClick={() => { this.props.history.push('/posts/' + post.id) }}