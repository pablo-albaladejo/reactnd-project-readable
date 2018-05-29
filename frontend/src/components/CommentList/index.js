
import React, { Component } from 'react';

import CommentDetail from '../CommentDetail';

import { css } from 'aphrodite';
import styles from './styles';

class CommentList extends Component {

    render() {
        let comments = this.props.item;
        let postId = this.props.postId;
        
        return (
            <div>
                <span className={css(styles.text)}>Comments</span>
                {comments.map((item, index) => {
                    return (
                        <CommentDetail key={index + 1} index={index + 1} comment={item} postId={postId}/>
                    );
                })}
                <CommentDetail index={0} postId={postId}/>
            </div>
        );
    }
}
export default CommentList;