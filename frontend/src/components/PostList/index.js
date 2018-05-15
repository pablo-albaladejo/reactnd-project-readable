
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { Table } from 'reactstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import {
    getAllPosts,
} from '../../actions/';

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

    render() {
        return (
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Votes</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.posts.map((post, index) => {
                        return (
                            <tr key={index} onClick={() => { this.props.history.push('/posts/' + post.id) }}>
                                <td>{index + 1}</td>
                                <td>{post.voteScore}</td>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{moment(post.timestamp).fromNow()}</td>
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