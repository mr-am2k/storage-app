import { Link } from 'react-router-dom';

import { EN_STRINGS } from '../../translation/en';

import './error.scss';

const Error = () => {
  return (
    <div className='c-error-wrapper'>

      <h1>{EN_STRINGS.ERROR_PAGE.ERROR_NUMBER}</h1>

      <p>{EN_STRINGS.ERROR_PAGE.MESSAGE}</p>

      <Link to='/'>
        <button>{EN_STRINGS.ERROR_PAGE.BUTTON_MESSAGE}</button>
      </Link>
    </div>
  );
};

export default Error;
