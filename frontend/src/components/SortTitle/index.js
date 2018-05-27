import React, { Component } from 'react';

import { css } from 'aphrodite';
import styles from './styles';

class SortTitle extends Component {

    render() {
        const titleStyles = "d-inline " + css(styles.text);
        const arrowStyles = "d-inline-block " + css(styles.arrow);
        const arrowUpStyles = "fa fa-sort-up " + css(styles.arrow);
        const arrowDownStyles = "fa fa-sort-down " + css(styles.arrow);
        return (
            <div>
                <div className={titleStyles}>{this.props.title}</div>
                <div className="d-inline">
                    <div className={arrowStyles}>
                        <div onClick={() => this.props.onSortAscending()}>
                            <i className={arrowUpStyles} />
                        </div>
                        <div onClick={() => this.props.onSortDescending()}>
                            <i className={arrowDownStyles} />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default SortTitle;