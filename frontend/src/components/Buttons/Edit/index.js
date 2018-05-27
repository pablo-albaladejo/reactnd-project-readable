import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { css } from 'aphrodite';
import styles from './styles';

class EditButton extends Component {

    render(){
        return(
            <Button className={css(styles.button)} onClick={this.props.onClick}><i className="fa fa-edit"/> Edit</Button>
        );
    }
}
export default EditButton;
