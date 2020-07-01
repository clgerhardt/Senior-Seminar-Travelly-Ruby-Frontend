import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBCollapse,
	MDBNavItem,
	MDBNavLink,
	MDBIcon
} from 'mdbreact';
class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false
		};
	}

	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}

	onClick = () => {
		this.setState({
			collapse: !this.state.collapse
		});
	};

	toggle = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	};

	render() {
		const { isAuthenticated } = this.props.auth;

		const authLinks = (
			<MDBNavLink onClick={this.onLogoutClick.bind(this)} to="/login">
				Logout
			</MDBNavLink>
		);

		const guestLinks = <MDBNavLink to="/login">Login</MDBNavLink>;

		return (
			<MDBNavbar className="flexible-navbar" light expand="md" scrolling>
				<MDBNavbarBrand href="/">
					<strong>Travelly</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.onClick} />
				<MDBCollapse isOpen={this.state.collapse} navbar>
					<MDBNavbarNav left>
						<MDBNavItem active>
							<MDBNavLink to="/">Home</MDBNavLink>
						</MDBNavItem>
					</MDBNavbarNav>
					<MDBNavbarNav right>
						{isAuthenticated ? authLinks : guestLinks}
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}

Navigation.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Navigation);
