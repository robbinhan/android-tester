import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as OrderActions from '../actions/order';

function mapStateToProps(state) {
  return {
    orderstate: state.orderstate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(OrderActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
