import createStore from '@/adapter/redux/store';
import { containerInstance } from '@/di';
import { AtomCommonProvider } from '@atom/common';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { LogoutCallback, PasswordChangeContainer, SignInCallback, SignInContainer } from './auth';
import { ROUTES } from './constants';
import { FormikHelpers } from 'formik';
import { LoginViewModel } from './models';
import { AuthenticatedProvider } from '@/atom-authorization';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    containerInstance.configure();

    setStore(createStore());
  }, []);

  if (!store) return null;

  return (
    <div className='login-page'>
      <Provider store={store}>
        <AtomCommonProvider initializeLanguage>
          <Router basename={ROUTES.baseUrl}>
            <Switch>
              <Route path={ROUTES.passChange} exact>
                <AuthenticatedProvider>
                  <PasswordChangeContainer />
                </AuthenticatedProvider>
              </Route>

              <Route path={ROUTES.loginUrl} exact>
                <SignInContainer />
              </Route>

              <Route path={ROUTES.callbackUrl} exact>
                <SignInCallback />
              </Route>

              <Route path={ROUTES.logoutCallbackUrl} exact>
                <LogoutCallback />
              </Route>

              <Redirect to={ROUTES.baseUrl} />
            </Switch>
          </Router>
        </AtomCommonProvider>
      </Provider>
    </div>
  );
};

export default App;
