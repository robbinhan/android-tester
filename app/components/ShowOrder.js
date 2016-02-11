import React, {
  Component, PropTypes
}
from 'react';
import {
  Link
}
from 'react-router';
import styles from './Home.module.css';
import DeviceList from './DeviceList';
import Nav from './Nav'

export default class ShowOrder extends Component {

  static propTypes = {
    orderstate: PropTypes.object.isRequired,
  };

  render() {
    const self = this;

    const {
      orderstate,
      execTestFlow,
      index
    } = self.props

    const {game, version, factory, packagename, mainactive, id, path, stdout} = orderstate.get("order")

    console.log('showorder props', self.props,);

    return (

      <div>
        <Nav />
      <div>游戏名： {game} </div>
      <div>版本：{version}</div>
      <div>厂商：{factory}</div>
      <div>包名：{packagename}</div>
      <div>启动窗口名：{mainactive}</div>
      <DeviceList />
      <pre>
        {stdout}
      </pre>
      <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();execTestFlow(orderstate)}}>执行测试</button>
      </div>
    );
  }
}
