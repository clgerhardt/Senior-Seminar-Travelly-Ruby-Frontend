import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (rest.auth.isAuthenticated) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: {
									from: props.location
								}
							}}
						/>
					);
				}
			}}
		/>
	);
};

ProtectedRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
