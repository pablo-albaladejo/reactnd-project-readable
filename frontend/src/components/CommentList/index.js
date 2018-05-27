
import React, { Component } from 'react';

import CommentDetail from '../CommentDetail';

import { css } from 'aphrodite';
import styles from './styles';

class CommentList extends Component {

    render() {
        let comments = this.props.item;
        return (
            <div>
                <span className={css(styles.text)}>Comments</span>
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