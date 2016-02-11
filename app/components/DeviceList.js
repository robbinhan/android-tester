import React, {
  Component, PropTypes
}
from 'react';
import {
  Link
}
from 'react-router';
import styles from './Home.module.css';

export default class DeviceList extends Component {


  render() {
    const self = this;

    const {

    } = self.props

    console.log('showorder props', self.props);

    return (
      <div>deviceList</div>
    );
  }
}
