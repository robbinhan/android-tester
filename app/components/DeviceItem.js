import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';

export default class DeviceItem extends Component {
  render() {
		const self = this;

		const {
			devices,
		} = self.props;

		console.log('deviceitem props',self.props);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>adb ID</td>
              <td>系统版本</td>
              <td>设备名称</td>
              <td>设备描述</td>
              <td>是否连接</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
        {devices.map((device,index)=>{
          const to = "/devices/edit/" + device.id
          return (
            <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.adb_id}</td>
                <td>{device.system_version}</td>
                <td>{device.name}</td>
                <td>{device.desc}</td>
                <td>{device.connect == true ? '已连接' : '未连接'}</td>
                <td><Link to={to} >编辑</Link></td>
            </tr>
          )
        })}
        </tbody>
        </table>
      </div>
    )
  }
}
