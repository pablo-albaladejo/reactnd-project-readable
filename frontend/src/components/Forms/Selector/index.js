import React, { Component } from 'react'

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
        const { input, editable, placeholder, items } = this.props;
        return (
            <select  {...input} disabled={!editable} className="form-control" id="category">
                <option value="-1">{placeholder}</option>
                {items.map((item, index) => {
                    return (<option key={index} value={item.id}>{item.name}</option>)
                })}
            </select>
        );
    }
}
export default Selector;