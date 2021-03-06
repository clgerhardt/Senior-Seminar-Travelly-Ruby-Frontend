import React from 'react';
import logo from '../assets/mdb-react.png';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => {
	return (
		<div className="sidebar-fixed position-fixed">
			<a href="#!" className="logo-wrapper waves-effect">
				<img alt="MDB React Logo" className="img-fluid" src={logo} />
			</a>
			<MDBListGroup className="list-group-flush">
				<NavLink exact={true} to="/" activeClassName="activeClass">
					<MDBListGroupItem>
						<MDBIcon icon="chart-pie" className="mr-3" />
						Dashboard
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/profile" activeClassName="activeClass">
					<MDBListGroupItem>
						<MDBIcon icon="user" className="mr-3" />
						Profile
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/tables" activeClassName="activeClass">
					<MDBListGroupItem>
						<MDBIcon icon="table" className="mr-3" />
						Tables
					</MDBListGroupItem>
				</NavLink>
				<NavLink
					to="/travelauthorization"
					activeClassName="activeClass"
				>
					<MDBListGroupItem>
						<MDBIcon icon="route" className="mr-3" />
						Travel Authorization
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/expensereport" activeClassName="activeClass">
					<MDBListGroupItem>
						<MDBIcon icon="money-bill-alt" className="mr-3" />
						Expense Report
					</MDBListGroupItem>
				</NavLink>
			</MDBListGroup>
		</div>
	);
};

export default SideNavigation;
