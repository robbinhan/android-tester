import React, { Component,PropTypes } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router';
import {reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import Nav from './Nav'

export const fields =  ['game', 'version', 'factory', 'packageName', 'mainactive', 'packageFile']; // all the fields in your form

export default class AddOrder extends Component {

	static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
  };

  render() {
		const self = this;

		const {
			fields: {game, version, factory, packageName, mainactive, packageFile},
			handleSubmit,
      onDrop,
			orderstate,
			location
		} = self.props;

		console.log('addprops',self.props);

		let isnew = false;
		if (_.has(location.query, 'new')) {
			 isnew = true;
			 location.query = {};
		}

		let filePath = '';
		if (orderstate.get('filePath') && !isnew) {
			 filePath = orderstate.get('filePath')
		}

    return (
			<div>
				<Nav />
	      <form onSubmit={handleSubmit} >
					<div className="form-group">
	 					<label >游戏名</label>
	 					<input type="text" className="form-control" {...game} />
 					</div>
					<div className="form-group">
	 					<label >版本号</label>
	 					<input type="text" className="form-control" {...version} />
 					</div>
					<div className="form-group">
	 					<label >厂商</label>
	 					<input type="text" className="form-control" {...factory} />
 					</div>
					<div className="form-group">
	 					<label >包名</label>
	 					<input type="text" className="form-control" {...packageName} />
 					</div>
					<div className="form-group">
	 					<label >启动窗口名</label>
	 					<input type="text" className="form-control" {...mainactive} />
 					</div>

					<div className="form-group">
	 					<label>游戏包：</label>
							{filePath}
							<Dropzone onDrop={onDrop}>
									<div>Try dropping some file here, or click to select files to upload.</div>
							</Dropzone>
 					</div>

	        <button type="submit" className="btn btn-primary">提交</button>
	      </form>
			</div>
    );
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'testorder',                           // a unique name for this form
  fields // all the fields in your form
})(AddOrder);
