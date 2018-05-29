//https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8
//https://codesandbox.io/s/MQnD536Km

import React, { Component } from 'react'

import { Field, reduxForm, reset } from 'redux-form'

import InputText from '../InputText'

import { connect } from 'react-redux';
import EditButton from '../../Buttons/Edit';
import DeleteButton from '../../Buttons/Delete';
import SaveButton from '../../Buttons/Save';
import CancelButton from '../../Buttons/Cancel';

const validateNotEmpty = value => !value ? 'Must enter a value' : null

class CommentForm extends Component {

  state = {
    editable: false,
  }

  ons

  render() {
    const { invalid, handleSubmit } = this.props
    return (
      <form>

        <Field name="body" editable={this.state.editable} component={InputText} validate={validateNotEmpty} />

        {!this.state.editable && (
          <div>
            <EditButton onClick={() => this.setState({ editable: true })} />{' '}
            <DeleteButton onClick={() => { this.props.onDelete(); this.props.dispatch(reset('commentForm')); }} />
          </div>
        )}

        {this.state.editable && (
          <div>
            <SaveButton disabled={invalid} onClick={
              handleSubmit((data) => {
                this.setState({ editable: false });
                this.props.onSave(data);
              })
            } />
            {' '}
            <CancelButton onClick={() => {
              this.setState({ editable: false });
              this.props.dispatch(reset(this.props.form));
            }} />
          </div>
        )}

      </form>
    )
  }
}

const config = {
  form: 'commentForm',
  enableReinitialize: true
}
let Form = reduxForm(config)(CommentForm);

function mapStateToProps(state, ownProps) {
  return {

    initialValues: {
      body: ownProps.value,
    },

    onSave: ownProps.onSave,
    onDelete: ownProps.onDelete,
  }
}
export default connect(mapStateToProps)(Form);