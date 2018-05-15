import React, { Component } from 'react';

import CategoriesList from '../../components/CategoriesList';
import PostList from '../../components/PostList';

class PostListScreen extends Component {

    render() {
        return (
            <div>
                <CategoriesList/>
                <PostList
                    category={this.props.match.params.category}
                />
            </div>
        );
    }
}
export default PostListScreen;