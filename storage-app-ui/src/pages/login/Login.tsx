import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useUser } from '../../hooks/useUser';
import { useForm } from '../../hooks/useForm';

import authService from '../../services/authService';
import { storageService } from '../../services/storageService';

import { LoginForm } from '../../components/index';
import { LoggedInUser } from '../../models/loggedInUser';
import { userLoginRequest } from '../../models/request/auth/userLoginRequest';
import { LOCAL_STORAGE } from '../../util/constants';
import jwt_decode from 'jwt-decode';

import './login.scss';
import axios from 'axios';

const Login = () => {
  const { fieldValues, isValid } = useForm();
  const { setLoggedInUser } = useUser();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>();

  const loginUser = async (loginRequest: userLoginRequest) => {    
    authService
      .login(loginRequest)
      .then(authResponse => {
        const tokenDecoded = jwt_decode<any>(authResponse.accessToken);

        storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, authResponse.accessToken);
        storageService.add(LOCAL_STORAGE.REFRESH_TOKEN, authResponse.refreshToken);
        storageService.add(LOCAL_STORAGE.USERNAME, tokenDecoded.user.username);
        storageService.add(LOCAL_STORAGE.ROLE, tokenDecoded.user.role);

        const user: LoggedInUser = {
          accessToken: authResponse.accessToken,
          username: tokenDecoded.user.username,
          role: tokenDecoded.user.role,
        };

        setLoggedInUser(user);
        navigate('/');
      })
      .catch(error => {
        setLoginError(error.response.data.message);
      });
  };

  const submitForm = () => {
    const { username, password } = fieldValues;

    const loginRequest: userLoginRequest = {
      username: username!,
      password: password!,
    };

    if (!isValid) {
      return;
    }

    loginUser(loginRequest);
  };

  const error = loginError ? (
    <div className='c-error-message'>
      <p>{loginError}</p>
    </div>
  ) : (
    ''
  );

  return (
    <div className='c-login-page'>
      <LoginForm onSubmit={submitForm} errorMessage={error} />
    </div>
  );
};

export default Login;
