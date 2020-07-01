import { SET_CURRENT_USER } from './types';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

const API_URL = 'https://reqres.in/api';

// Register User
// export const registerUser = (userData, history) => dispatch => {
// 	axios
// 		.post('/api/users/register', userData)
// 		.then(res => {
// 			history.push('/login');
// 		})
// 		.catch(err =>{}
// 		);
// };

// Login User - Get User Token
export const loginUser = (userData, history) => dispatch => {
	axios.post(`${API_URL}/register`, userData).then(response => {
		const { token } = response.data;
		// Set token to local storage
		localStorage.setItem('jwtToken', token);

		// Set token to Authorization header
		setAuthToken(token);

		// Decode token to get user data
		// const decoded = jwt_decode(token);
		// Set current user
		dispatch(setCurrentUser(userData));

		// send user to dashboard
		history.push('/');
	});
	// .catch(err =>
	// 	dispatch({
	// 		type: SET_ERRORS,
	// 		payload: err.response.data
	// 	})
	// );
};

// Set Authorization header
export const setAuthToken = token => {
	if (token) {
		// Apply to every request
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		// Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};

// Current User - testing a private API endpoint
export const currentUser = userData => dispatch => {
	axios.get(`${API_URL}/api/users/2`, {}).then(res => {
		const pay = {
			...res.data.data
		};
		dispatch({
			type: SET_CURRENT_USER,
			payload: pay
		});
	});
	// .catch(err =>
	// 	dispatch({
	// 		type: SET_ERRORS,
	// 		payload: err.response.data
	// 	})
	// );
};

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
