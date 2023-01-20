import { useState } from 'react';

import UserContext from './user-context';

import authService from '../../services/authService';
import { storageService } from '../../services/storageService';

import { LoggedInUser } from '../../models/loggedInUser';
import { LOCAL_STORAGE } from '../../util/constants';

import jwt_decode from 'jwt-decode';

type Props = {
  children?: React.ReactNode;
};

const UserProvider: React.FC<Props> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | undefined>();

  const isUserLoggedIn = () => {
    if (loggedInUser) {
      return true;
    }
    return false;
  };

  const resetLoggedInUser = () => {
    setLoggedInUser(undefined);
  };

  const loginUser = async () => {
    return new Promise<LoggedInUser>((resolve, reject) => {
      authService
        .refreshToken()
        .then(authResponse => {
          storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, authResponse.accessToken);

          const tokenDecoded = jwt_decode<any>(authResponse.accessToken);

          storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, authResponse.accessToken);
          storageService.add(LOCAL_STORAGE.USERNAME, tokenDecoded.user.username);
          storageService.add(LOCAL_STORAGE.ROLE, tokenDecoded.user.role);

          const user: LoggedInUser = {
            accessToken: authResponse.accessToken,
            username: tokenDecoded.user.username,
            role: tokenDecoded.user.role,
          };

          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const logoutUser = () => {
    storageService.clear();
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        isUserLoggedIn,
        resetLoggedInUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
