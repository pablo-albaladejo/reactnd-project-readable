import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { css } from 'aphrodite';
import styles from './styles';

class NewButton extends Component {

    render(){
        return(
            <Button className={css(styles.button)} onClick={this.props.onClick}><i className="fa fa-plus" /> New</Button>
        );
    }
}
export default NewButton;
