import { FormProvider } from './store';

import './app.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login, Error, AdminPanel } from './pages';
import { Header, Navbar } from './components';
import { useEffect } from 'react';
import { useUser } from './hooks/useUser';
import { storageService } from './services/storageService';
import { LOCAL_STORAGE } from './util/constants';
import { getTokenExpirationDate } from './util/jwtUtils';
import Employee from './pages/employee/Employee';

const App = () => {
  const { loggedInUser, setLoggedInUser, resetLoggedInUser, loginUser, logoutUser, isUserLoggedIn } = useUser();
  const navigate = useNavigate();

  const accessToken = storageService.get(LOCAL_STORAGE.ACCESS_TOKEN);

  const setUser = () => {
    loginUser().then(user => {
      setLoggedInUser(user);
    });
  };

  useEffect(() => {
    if (accessToken && getTokenExpirationDate(accessToken) < new Date()) {
      logoutUser();
      resetLoggedInUser();
      navigate('/login');
    } else {
      setUser();
    }
  }, []);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/login');
    }
  }, []);

  let routes;
  if (isUserLoggedIn()) {
    routes = (
      <>
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/add-employee' element={<Employee />} />
      </>
    );
  }

  return (
    <FormProvider>
      <div className='c-page-wrapper'>
        <Header />
        {isUserLoggedIn() && <Navbar />}
        <main>
          <Routes>
            {!isUserLoggedIn() && <Route path='/login' element={<Login />} />}
            {routes}
            <Route path='*' element={<Error />} />
          </Routes>
        </main>
      </div>
    </FormProvider>
  );
};

export default App;
