import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/posts';

import PostList from '../../components/PostList';

class PostListScreen extends Component {

    componentWillMount() {
        this.props.dispatch(getAllPosts());
    }

    render() {

        console.log(this.props.posts);
        return (
            <PostList 
                posts={this.props.posts}
            />
        );
    }
}
function mapStateToProps(state) {
    let posts = [];

    Object.keys(state.posts).forEach(post_id => {
        let post = state.posts[post_id];
        posts.push(post);
    });

    return {
        posts,
    }
}
export default connect(mapStateToProps)(PostListScreen);