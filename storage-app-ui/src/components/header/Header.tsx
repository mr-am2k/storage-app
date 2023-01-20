import { useNavigate } from 'react-router';
import { storageService } from '../../services/storageService';
import { LOCAL_STORAGE } from '../../util/constants';
import './header.scss';
import { useUser } from '../../hooks/useUser';

const Header = () => {
  const navigate = useNavigate();
  const username = storageService.get(LOCAL_STORAGE.USERNAME);
  const { resetLoggedInUser, isUserLoggedIn } = useUser();

  const handleLogout = () => {
    storageService.clear();
    resetLoggedInUser();
    navigate('/login');
  };

  const handleRedirect = () => {
    isUserLoggedIn() ? navigate('/') : navigate('/login')
  };

  return (
    <div className='c-header'>
      <h3 onClick={handleRedirect}>Storage app</h3>

      {isUserLoggedIn() && (
        <div>
          <p>Hi, {username}</p>
          <span onClick={handleLogout}>Logout</span>
        </div>
      )}
    </div>
  );
};

export default Header;
