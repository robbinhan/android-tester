import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import {reduxForm} from 'redux-form';

export const fields =  ['name', 'system_version', 'desc','id']; // all the fields in your form

export default class DeviceForm extends Component {

  render() {
		const self = this;

		const {
      handleSubmit,
      fields:{name,system_version,desc,id}
		} = self.props;

		console.log('DeviceForm props',self.props);

		return (
      <div>
        <form onSubmit={handleSubmit}>
	        <label>设备名：</label><input type="text" {...name}  /><br/>
	        <label>系统版本：</label><input type="text" {...system_version} /><br/>
	        <label>描述：</label><input type="text"  {...desc} /><br/>
          <input type="hidden" {...id} />
	        <button type="submit" className="btn btn-primary">提交</button>
	      </form>
      </div>
		)
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'editdevice',                           // a unique name for this form
  fields // all the fields in your form
})(DeviceForm);
