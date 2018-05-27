import React, { Component } from 'react';

import { css } from 'aphrodite';
import styles from './styles';

class VoteScore extends Component {

    render() {
        const arrowUp = "fa fa-arrow-up " + css(styles.arrow);
        const arrowDown = "fa fa-arrow-down " + css(styles.arrow);
        return (
            <div>
                <i className={arrowUp} onClick={() => this.props.onUpVote(this.props.id)} />
                <span className={css(styles.counter)} >{this.props.value}</span>
                <i className={arrowDown} onClick={() => this.props.onDownVote(this.props.id)} />
            </div>
        );
    }
}
export default VoteScore;