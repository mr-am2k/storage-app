import { EmployeeForm } from '../../components';
import { useForm } from '../../hooks/useForm';
import { CreateEmployeeRequest } from '../../models/request/employee/createEmployeeRequest';
import employeeService from '../../services/employeeService';
import './employee.scss';

const Employee = () => {
  const { fieldValues, isValid } = useForm();

  const addEmployee = (createEmployeeRequest: CreateEmployeeRequest) => {
    employeeService.addEmployee(createEmployeeRequest).then(response => console.log(response));
  };

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }

    const { firstName, lastName, phoneNumber, address, email, employmentDate, username, password } = fieldValues;

    const createEmployeeRequest: CreateEmployeeRequest = {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      employmentDate,
      username,
      password,
    };

    addEmployee(createEmployeeRequest);
  };
  return (
    <div className='c-employee-wrapper'>
      <EmployeeForm onSubmit={handleSubmit} />;
    </div>
  );
};

export default Employee;
