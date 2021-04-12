/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from 'containers/AuthProvider';
import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';
import ProfilePage from 'containers/ProfilePage';

// eslint-disable-next-line no-unused-vars
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute exact path="/profile">
        <ProfilePage />
      </PrivateRoute>
    </Switch>
  );
}
