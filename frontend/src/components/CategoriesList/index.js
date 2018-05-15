import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import {
    getAllCategories
} from '../../actions/';

class CategoriesList extends Component {

    componentWillMount() {
        this.props.dispatch(getAllCategories());
    }

    render() {
        return (
            <div>
                categories:
                <ul>
                    {this.props.categories.map((category, index) => {
                        return <li key={index}><Link to={category.path}>{category.name}</Link></li>
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let categories = [];
    Object.keys(state.categories).forEach(category_id => {
        let category = state.categories[category_id];
        categories.push(category);
    });

    return {
        categories,
    }
}
export default connect(mapStateToProps)(CategoriesList);