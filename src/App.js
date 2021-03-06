import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { isLoggedInVar, darkModeVar, client } from './apollo';

import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';

import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import SignUp from './screens/SignUp';
import routes from './screens/routes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
