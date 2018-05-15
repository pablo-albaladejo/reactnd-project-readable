import React, { Component } from 'react';

class SortTitle extends Component {

    render() {
        return (
            <div>
                <div className="d-inline">{this.props.title}</div>
                <div className="d-inline">
                    <div className="d-inline-block" style={{ marginLeft: 5 }}>
                        <div onClick={() => this.props.onSortAscending()}>
                            <i className="fa fa-sort-up" />
                        </div>
                        <div onClick={() => this.props.onSortDescending()}>
                            <i className="fa fa-sort-down" />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default SortTitle;