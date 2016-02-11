import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Devices from '../components/Devices';
import * as DeviceActions from '../actions/devices';



function mapStateToProps(state) {
  return {
    devicestate: state.device
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DeviceActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
