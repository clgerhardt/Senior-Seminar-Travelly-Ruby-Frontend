import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './assets/scss/mdb.scss';
import Login from './components/Login';
import TravelAuthorization from './components/travel_authorization/TravelAuthorization';
import ExpenseReport from './components/expense_report/ExpenseReport';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store';
import {
	setCurrentUser,
	setAuthToken,
	logoutUser
} from './actions/authActions';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import DashboardPage from './components/pages/DashboardPage';
import ProfilePage from './components/pages/ProfilePage';
import TablesPage from './components/pages/TablesPage';
import NotFoundPage from './components/pages/NotFoundPage';

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	//TODO: Replace with user data
	// const decoded = jwt_decode(localStorage.jwtToken);
	const decoded = {
		email: 'trangelier@gmail.com',
		username: 'trangelier',
		name: 'Tyler Angelier'
	};
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = '/login';
	}
}

function App() {
	return (
		<Provider store={store}>
			<div className="flexible-content">
				<TopNavigation />
				<SideNavigation />
				<main id="content" className="p-5">
					<Switch>
						<Route exact path="/login" component={Login} />
						<ProtectedRoute
							exact
							path="/"
							component={DashboardPage}
						/>
						<ProtectedRoute
							exact
							path="/dashboard"
							component={DashboardPage}
						/>
						<ProtectedRoute
							path="/profile"
							component={ProfilePage}
						/>
						<ProtectedRoute path="/tables" component={TablesPage} />
						<ProtectedRoute
							exact
							path="/expensereport"
							component={ExpenseReport}
						/>
						<ProtectedRoute
							exact
							path="/travelauthorization"
							component={TravelAuthorization}
						/>
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</main>
				<Footer />
			</div>
		</Provider>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	rootElement
);
