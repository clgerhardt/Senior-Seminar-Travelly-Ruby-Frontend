import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { Form } from 'react-bootstrap';
import './Login.css';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBInput,
	MDBBtn,
	MDBCard,
	MDBCardBody
} from 'mdbreact';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(newUser, this.props.history);
	}

	render() {
		return (
			<MDBContainer>
				<MDBRow>
					<MDBCol md="9">
						<MDBCard>
							<MDBCardBody>
								<Form onSubmit={this.onSubmit}>
									<p className="h5 text-center mb-4">
										Sign in
									</p>
									<div className="grey-text">
										<MDBInput
											label="Type your email"
											icon="envelope"
											group
											type="email"
											name="email"
											value={this.state.email}
											onChange={this.onChange}
											validate
											error="wrong"
											success="right"
										/>
										<MDBInput
											label="Type your password"
											icon="lock"
											group
											type="password"
											onChange={this.onChange}
											value={this.state.password}
											name="password"
											id="password"
											validate
										/>
									</div>
									<div className="text-center">
										<MDBBtn type="submit" s>
											Login
										</MDBBtn>
									</div>
								</Form>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	loginUser: state.user
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);

// <main className="container login-container">
// <div className="row">
// 	<div className="col-md-12 login-form-1">
// 		<h3>Login</h3>
// 		<Form onSubmit={this.onSubmit}>
// 			<Form.Group>
// 				<Form.Control
// 					name="email"
// 					id="email"
// 					type="email"
// 					placeholder="Enter email"
// 					value={this.state.email}
// 					onChange={this.onChange}
// 					className="form-control"
// 				/>
// 			</Form.Group>

// 			<Form.Group>
// 				<Form.Control
// 					name="password"
// 					id="password"
// 					type="password"
// 					placeholder="Password"
// 					onChange={this.onChange}
// 					value={this.state.password}
// 					className="form-control"
// 				/>
// 			</Form.Group>

// 			<Button
// 				variant="primary"
// 				type="submit"
// 				className="btnSubmit"
// 			>
// 				Login
// 			</Button>
// 		</Form>
// 	</div>
// </div>
// </main>
