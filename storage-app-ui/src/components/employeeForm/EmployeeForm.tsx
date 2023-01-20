import { Input, Form } from '..';
import { useForm } from '../../hooks/useForm';
import { Employee } from '../../models/employee';
import { EMPLOYEE } from '../../translation/en';
import { EMPLOYEE_FORM, INPUT_TYPE_DATE, INPUT_TYPE_NUMBER, INPUT_TYPE_PASSWORD, INPUT_TYPE_TEXT } from '../../util/constants';
import { validate as validateEmail } from '../../validators/validateEmail';
import { validate as validatePassword } from '../../validators/validatePassword';
import { validate as validateDateIsInFuture } from '../../validators/validateDateIsInFuture';
import '../form/form.scss';

type Props = {
  children?: React.ReactNode;
  employee?: Employee;
  onSubmit: () => void;
};

const CreditCardForm: React.FC<Props> = ({ employee, onSubmit }) => {
  const { fieldValues } = useForm();

  const children = [
    <Input
      key={EMPLOYEE_FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      name={EMPLOYEE_FORM.FIRST_NAME}
      title={EMPLOYEE.FIRST_NAME_TITLE}
      placeholder={employee?.first_name ? employee.first_name : EMPLOYEE_FORM.FIRST_NAME_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.FIRST_NAME]}
      required={true}
    />,

    <Input
      key={EMPLOYEE_FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      name={EMPLOYEE_FORM.LAST_NAME}
      title={EMPLOYEE.LAST_NAME_TITLE}
      placeholder={employee?.last_name ? employee.last_name : EMPLOYEE_FORM.LAST_NAME_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.LAST_NAME]}
      required={true}
    />,

    <Input
      key={EMPLOYEE_FORM.PHONE_NUMBER}
      type={INPUT_TYPE_NUMBER}
      name={EMPLOYEE_FORM.PHONE_NUMBER}
      title={EMPLOYEE.PHONE_NUMBER_TITLE}
      placeholder={employee?.phone_number ? employee.phone_number : EMPLOYEE_FORM.PHONE_NUMBER_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.PHONE_NUMBER]}
      required={true}
    />,

    <Input
      key={EMPLOYEE_FORM.ADDRESS}
      type={INPUT_TYPE_TEXT}
      name={EMPLOYEE_FORM.ADDRESS}
      title={EMPLOYEE.ADDRESS_TITLE}
      placeholder={employee?.address ? employee.address : EMPLOYEE_FORM.ADDRESS_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.ADDRESS]}
      required={true}
    />,

    <Input
      key={EMPLOYEE_FORM.EMAIL}
      type={INPUT_TYPE_TEXT}
      name={EMPLOYEE_FORM.EMAIL}
      title={EMPLOYEE.EMAIL_TITLE}
      placeholder={employee?.email ? employee.email : EMPLOYEE_FORM.EMAIL_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.EMAIL]}
      validator={validateEmail}
      required={true}
    />,

    <Input
      key={EMPLOYEE_FORM.EMPLOYMENT_DATE}
      type={INPUT_TYPE_DATE}
      name={EMPLOYEE_FORM.EMPLOYMENT_DATE}
      title={EMPLOYEE.EMPLOYMENT_DATE_TITLE}
      placeholder={employee?.employment_date ? employee.employment_date : EMPLOYEE_FORM.EMPLOYMENT_DATE_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.EMPLOYMENT_DATE]}
      validator={validateDateIsInFuture}
      required={true}
    />,

    <Input
      key={EMPLOYEE_FORM.USERNAME}
      type={INPUT_TYPE_TEXT}
      name={EMPLOYEE_FORM.USERNAME}
      title={EMPLOYEE.USERNAME_TITLE}
      placeholder={employee?.username ? employee.username : EMPLOYEE_FORM.USERNAME_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.USERNAME]}
      required={true}
    />,

    <Input
      key={EMPLOYEE_FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      name={EMPLOYEE_FORM.PASSWORD}
      title={EMPLOYEE.PASSWORD_TITLE}
      placeholder={EMPLOYEE_FORM.PASSWORD_PLACEHOLDER}
      value={fieldValues[EMPLOYEE_FORM.PASSWORD]}
      validator={validatePassword}
      required={true}
    />,
  ];

  return <Form children={children} primaryActionLabel='SAVE' onSubmit={onSubmit} className='c-form-border' />;
};

export default CreditCardForm;
