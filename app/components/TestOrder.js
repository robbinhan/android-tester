import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import AddOrder from './AddOrder';
import ShowOrder from './ShowOrder';
import Immutable,{Map} from 'immutable';

export default class TestOrder extends Component {

	static propTypes = {
		params: PropTypes.object.isRequired,
  };

  render() {
		const self = this;

		const {
			params,
			onSubmit,
			orderstate,
			execTestFlow,
			onDrop,
			queryOrder
		} = self.props;

		console.log('testorder props',self.props);

		if (params.method == 'add') {
			return <AddOrder onSubmit={onSubmit} onDrop={onDrop} orderstate={orderstate}/>
		} else if (params.method == 'show') {
			if (params.id && orderstate.has('order') === false) {
				 queryOrder(params.id)
				 return <div></div>
			} else {
				return <ShowOrder orderstate={orderstate} execTestFlow={execTestFlow} index={params.id}/>
			}

		}

  }
}
