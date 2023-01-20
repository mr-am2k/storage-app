import { Input, Form } from '../index';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { LOGIN, USER } from '../../translation/en';
import { INPUT_TYPE_EMAIL, INPUT_TYPE_PASSWORD, USER_FORM } from '../../util/constants';
import { validate as validatePassword } from '../../validators/validatePassword';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const LoginForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { resetFieldValues, setFieldValidationResults } = useForm();

  const children = [
    <Input
      key={USER_FORM.USERNAME}
      type={INPUT_TYPE_EMAIL}
      name={USER_FORM.USERNAME}
      title={USER.USERNAME_TITLE}
      placeholder={USER_FORM.USERNAME_PLACEHOLDER}
      required
    />,

    <Input
      key={USER_FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      name={USER_FORM.PASSWORD}
      title={USER.PASSWORD_TITLE}
      placeholder={USER_FORM.PASSWORD_PLACEHOLDER}
      pattern={USER_FORM.PASSWORD_PATTERN}
      validator={validatePassword}
      required
    />,
  ];

  useEffect(() => {
    return () => {
      resetFieldValues();
      setFieldValidationResults({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form
        children={children}
        onSubmit={onSubmit}
        primaryActionLabel={LOGIN.LOGIN}
        errorMessage={errorMessage}
        className='c-form-border'
      />
    </div>
  );
};

export default LoginForm;
