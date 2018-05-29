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
import NewButton from '../../Buttons/New';

const validateNotEmpty = value => !value ? 'Must enter a value' : null

class CommentForm extends Component {

  state = {
    editable: false,
  }

  render() {
    const { invalid, handleSubmit } = this.props
    return (
      <form>

        <Field type="text" name="author" placeholder={"Author"} editable={this.props.isNew} component={InputText} validate={validateNotEmpty} />
        <Field type="textarea" name="body" placeholder={"Comment"} editable={this.state.editable || this.props.isNew} component={InputText} validate={validateNotEmpty} />

        {!this.state.editable && !this.props.isNew && (
          <div>
            <EditButton onClick={() => this.setState({ editable: true })} />{' '}
            <DeleteButton onClick={() => { this.props.onDelete(); this.props.dispatch(reset('commentForm')); }} />
          </div>
        )}

        {this.state.editable && !this.props.isNew && (
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

        {this.props.isNew && (
          <NewButton
            onClick={
              handleSubmit((data) => {
                this.props.onAdd(data);
              })
            }
          />
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
      author: ownProps.author,
    },

    isNew: ownProps.isNew,

    onSave: ownProps.onSave,
    onDelete: ownProps.onDelete,
    onAdd: ownProps.onAdd,
  }
}
export default connect(mapStateToProps)(Form);