import React, { Component } from 'react';
import HistoryTestOrder from './HistoryTestOrder'
import Nav from './Nav'

export default class Home extends Component {

  constructor(props){
    super(props)
    if (this.props.orderstate.get('status') != 'queryed') {
      this.props.historyOrders();
    }
  }

  render() {
    const self = this;

    const {
      orderstate
     } = self.props;

    console.log('home',self.props);

    return (
      <div>
          <Nav />
          <h2>历史测试单</h2>
          {(orderstate.has('orders') ? orderstate.get('orders')[0] : false) ? <HistoryTestOrder orders={orderstate.get('orders')}/> : '暂无' }
      </div>
    );
  }
}
