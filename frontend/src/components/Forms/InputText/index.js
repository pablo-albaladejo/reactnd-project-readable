//https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8
import React, { Component } from 'react'
import {
  Input,
} from 'reactstrap';

import { css } from 'aphrodite';
import styles from './styles';

class InputText extends Component {

  render() {
    const { input, type, editable, placeholder, meta: { touched, error } } = this.props;
    return (
      <div>
        <Input {...input} type={type} placeholder={placeholder} readOnly={!editable}/>
        {touched && error && <span className={css(styles.text)}>{error}</span>}
      </div>
    );
  }
}
export default InputText;