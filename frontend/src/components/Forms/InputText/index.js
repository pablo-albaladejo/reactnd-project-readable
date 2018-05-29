//https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8
import React, { Component } from 'react'
import {
  Input,
} from 'reactstrap';

class InputText extends Component {

  render() {
    const { input, editable, meta: { touched, error } } = this.props;
    return (
      <div>
        <Input {...input} type="textarea" readOnly={!editable}/>
        {touched && error && <span className="error">{error}</span>}
      </div>
    );
  }
}
export default InputText;