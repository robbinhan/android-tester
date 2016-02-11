import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import DeviceForm from './DeviceForm';
import Nav from './Nav';

export default class EditDevice extends Component {

  render() {
		const self = this;

		const {
      id,
			devicestate,
      onSubmit
		} = self.props;

    const status = devicestate.get('status');
    const devices = devicestate.get('devices');

    const device = _.find(devices, ['id', parseInt(id)]);

		console.log('editdevice props',self.props,devices);

		return (
      <div>
        <Nav />
        <DeviceForm initialValues={device} onSubmit={onSubmit}/>
      </div>
		)
  }
}
