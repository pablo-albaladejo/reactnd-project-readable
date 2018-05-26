import React, { Component } from 'react';

import { css } from 'aphrodite';
import styles from './styles';

class VoteScore extends Component {

    render() {
        return (
            <div>
                <i className={"fa fa-arrow-up" + " " + css(styles.arrow)} onClick={() => this.props.onUpVote(this.props.id)} />
                <span className={css(styles.counter)} >{this.props.value}</span>
                <i className={"fa fa-arrow-down" + " " + css(styles.arrow)} onClick={() => this.props.onDownVote(this.props.id)} />
            </div>
        );
    }
}
export default VoteScore;