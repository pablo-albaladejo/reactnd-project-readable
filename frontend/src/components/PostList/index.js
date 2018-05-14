
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { Table } from 'reactstrap';
import moment from 'moment';

class PostList extends Component {
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
export default withRouter(PostList);