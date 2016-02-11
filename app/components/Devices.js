import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import DeviceItem from './DeviceItem';
import EditDevice from './EditDevice';
import Nav from './Nav';

export default class Devices extends Component {

  constructor(props) {
    super(props);
    if (this.props.devicestate.get('status') != 'queryed') {
      this.props.queryDevices();
    }
  }

	static propTypes = {
		params: PropTypes.object.isRequired,
  };

  render() {
		const self = this;

		const {
			params,
			devicestate,
      onSubmit
		} = self.props;

    const status = devicestate.get('status');
    const devices = devicestate.get('devices');

		console.log('device props',self.props);


    if (params.method == 'edit' && params.id) {
      return <EditDevice id={params.id} devicestate={devicestate} onSubmit={onSubmit}/>
    }

		return (
      <div>
        <Nav />
        {status == 'queryed' ? <DeviceItem devices={devices} />   : ''}

      </div>
		)
  }
}
