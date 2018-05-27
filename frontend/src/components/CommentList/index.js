
import React, { Component } from 'react';

import CommentDetail from '../CommentDetail';

class CommentList extends Component {

    render() {
        let comments = this.props.item;
        return (
            <div>
                {comments.map((item, index) => {
                    return (
                        <CommentDetail  key={index} comment={item}/>
                    );
                })}
            </div>
        );
    }
}
export default CommentList;