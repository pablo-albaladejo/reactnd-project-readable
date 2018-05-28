import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { css } from 'aphrodite';
import styles from './styles';

class SaveButton extends Component {

    render(){
        
        return(
            <Button disabled={this.props.disabled} className={css(styles.button)} onClick={this.props.onClick}><i className="fa fa-floppy-o"/> Save</Button>
        );
    }
}
export default SaveButton;
