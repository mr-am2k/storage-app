import { useNavigate } from 'react-router';
import { Employee } from '../../models/employee';
import './employees-table.scss';
import { getDateString } from '../../util/dateUtils';
import { Link } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
  employees: Employee[];
};

const EmployeesTable: React.FC<Props> = ({ employees }) => {
  const navigate = useNavigate();
  const handleUpdate = (id: number) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div>
      {employees.length ? (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>First name</td>
              <td>Last name</td>
              <td>Phone number</td>
              <td>Address</td>
              <td>Email</td>
              <td>Employment date</td>
              <td>Dismissal date</td>
              <td>Username</td>
              <td>Role</td>
              <td>Update </td>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.address}</td>
                <td>{employee.email}</td>
                <td>{getDateString(employee.employment_date)}</td>
                <td>{employee.dismissal_date ? getDateString(employee.dismissal_date) : 'Still working'}</td>
                <td>{employee.username}</td>
                <td>{employee.role}</td>
                <td>
                  <Link to={`/employee/${employee.id}`}>UPDATE</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>Currently we don't have employees!</h4>
      )}

      <Link to='/add-employee'>ADD NEW EMPLOYEE</Link>
    </div>
  );
};

export default EmployeesTable;
