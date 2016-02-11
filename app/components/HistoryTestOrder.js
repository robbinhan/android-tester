import React, { Component,PropTypes } from 'react';
import {
  Link
}
from 'react-router';

export default class HistoryTestOrder extends Component {


  render() {

    const self = this;

    const {
      orders
     } = self.props;

    console.log('historyOrders',self.props);

    let rows = [];
    orders.forEach((element, index, array) => {
      const to = "/testorder/show/"+element.get('id');
      rows.push(
        <tr key={index}>
          <td>{element.get('game')}</td>
          <td>{element.get('version')}</td>
          <td>{element.get('factory')}</td>
          <td>{element.get('packagename')}</td>
          <td>{element.get('mainactive')}</td>
          <td><Link to={to}>查看</Link></td>
        </tr>);
    })

    console.log('rows',rows)

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>游戏名</td>
              <td>版本号</td>
              <td>厂商</td>
              <td>包名</td>
              <td>启动窗口名</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>
    );
  }
}
