//https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8
//https://codesandbox.io/s/MQnD536Km

import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form'

import InputText from '../InputText'
import Selector from '../Selector'

import EditButton from '../../Buttons/Edit';
import DeleteButton from '../../Buttons/Delete';
import SaveButton from '../../Buttons/Save';
import CancelButton from '../../Buttons/Cancel';
import NewButton from '../../Buttons/New';

const validateNotEmpty = value => !value ? 'Must enter a value' : null
const validateNotSelected = value => value < 0 ? 'Must select a value' : null;

class PostForm extends Component {
  render() {
    const { invalid, handleSubmit } = this.props
    return (
      <form>

        <Field type="text" name="title" placeholder="Title" editable={this.props.editable || this.props.isNew} component={InputText} validate={validateNotEmpty} />
        <Field name="category" placeholder="Category" items={this.props.categories} editable={this.props.isNew} component={Selector} validate={validateNotSelected} />
        <Field type="text" name="author" placeholder="Author" editable={this.props.isNew} component={InputText} validate={validateNotEmpty} />
        <Field type="textarea" name="body" placeholder="Message" editable={this.props.editable || this.props.isNew} component={InputText} validate={validateNotEmpty} />

        {!this.props.editable && !this.props.isNew && (
          <div>
            <EditButton onClick={() => this.props.onEdit()} />{' '}
            <DeleteButton onClick={() => this.props.onDelete()} />
          </div>
        )}
        {this.props.editable && !this.props.isNew && (
          <div>
            <SaveButton disabled={invalid} onClick={this.props.handleSubmit(this.props.onSave)} />{' '}
            <CancelButton onClick={() => { this.props.dispatch(reset('postForm')); this.props.onCancel(); }} />
          </div>
        )}

        {this.props.isNew && (
          <NewButton onClick={
            handleSubmit((data) => {
              this.props.onAdd(data);
            })
          } />
        )}

      </form>
    )
  }
}

const config = {
  form: 'postForm',
  enableReinitialize: true
}
let Form = reduxForm(config)(PostForm);

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      title: ownProps.title,
      author: ownProps.author,
      body: ownProps.value,
      category: ownProps.category,
      categories: ownProps.categories,
    },

    editable: ownProps.editable,
    isNew: ownProps.isNew,

    onEdit: ownProps.onEdit,
    onCancel: ownProps.onCancel,
    onSave: ownProps.onSave,
    onDelete: ownProps.onDelete,
    onAdd: ownProps.onAdd,
  }
}
export default connect(mapStateToProps)(Form);