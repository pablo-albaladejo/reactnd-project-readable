import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import {
    getAllCategories
} from '../../actions/categories';


import { css } from 'aphrodite';
import styles from './styles';

class CategoriesList extends Component {

    componentWillMount() {
        this.props.dispatch(getAllCategories());
    }

    render() {
        return (
            <div className={css(styles.container)}>
                <span className={css(styles.label)}>Categories:</span>
                <ul className={css(styles.ul)}>
                    {this.props.categories.map((category, index) => {
                        return <li key={index} className={css(styles.li)}><Link className={css(styles.link)} to={category.path}>{category.name}</Link></li>
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let categories = [];

    if (!state.categories.isFetching) {
        Object.keys(state.categories.ids).forEach(category_id => {
            let category = state.categories.ids[category_id];
            categories.push(category);
        });
    }

    return {
        categories,
    }
}
export default connect(mapStateToProps)(CategoriesList);