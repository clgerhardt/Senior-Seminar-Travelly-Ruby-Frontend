import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

import Navigation from './layout/Navigation';

class Dashboard extends React.Component {
	render() {
		return (
			<div className="">
				<Navigation />

				<main className="">
					<div className="">
						<Link to="/expensereport">Expense Report</Link>
					</div>
					<div className="">
						<Link to="/travelauthorization">
							Travel Authorization
						</Link>
					</div>
				</main>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Dashboard);
