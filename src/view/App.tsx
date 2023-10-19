import createStore from '@/adapter/redux/store';
import { AuthenticatedProvider } from '@/atom-authorization';
import { containerInstance } from '@/di';
import { AtomCommonProvider } from '@atom/common';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { LogoutCallback, SignInCallback, SignInContainer } from './auth';
import { ROUTES } from './constants';

const PasswordChangeContainer = lazy(async () => ({
  default: (await System.import('@atom/user-management')).PasswordChangeContainer
}));

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
                  <Suspense fallback={<></>}>
                    <PasswordChangeContainer />
                  </Suspense>
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
