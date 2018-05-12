import React, { Component } from 'react';

import { connect } from 'react-redux';

class PostDetailScreen extends Component {

    componentWillMount() {
        console.log(this.props.match.params);
    }

    render() {
        return (
            <div>
                {this.props.post.name}
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    let post = {};

    return {
        post
    }
}
export default connect(mapStateToProps)(PostDetailScreen);