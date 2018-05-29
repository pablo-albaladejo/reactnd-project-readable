import React, { Component } from 'react'

import { css } from 'aphrodite';
import styles from './styles';

class Selector extends Component {

    state = {
        dropdownOpen: false,
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const { input, editable, placeholder, items, meta: { touched, error } } = this.props;
        return (
            <div>
                <select  {...input} disabled={!editable} className="form-control" id="category">
                    <option value="-1">{placeholder}</option>
                    {items.map((item, index) => {
                        return (<option key={index} value={item.id}>{item.name}</option>)
                    })}
                </select>
                {touched && error && <span className={css(styles.text)}>{error}</span>}
            </div>
        );
    }
}
export default Selector;