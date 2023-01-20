import { Link } from 'react-router-dom';
import './navbar.scss';

const routes = [
  { label: 'Admin panel', route: '/admin' },
  { label: 'Materials', route: '/materials' },
  { label: 'Suppliers', route: '/suppliers' },
];

const Navbar = () => {
  return (
    <div className='c-navbar-wrapper'>
      {routes.map((route, index) => (
        <Link to={route.route} key={index}>
          <p>{route.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
