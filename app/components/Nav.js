import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';


export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <ul className="nav navbar-nav">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/testorder/add">新建测试单</Link></li>
            <li><Link to="/devices/index">设备管理</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}
