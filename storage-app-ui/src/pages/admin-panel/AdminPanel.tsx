import { useEffect, useState } from 'react';
import employeeService from '../../services/employeeService';
import './admin-panel.scss';
import { Employee } from '../../models/employee';
import { EmployeesTable } from '../../components';

const AdminPanel = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = () => {
    employeeService.getEmployees().then(response => setEmployees(response));
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className='c-admin-panel-wrapper'>
      <h2>Employees</h2>
      <EmployeesTable employees={employees} />
    </div>
  );
};

export default AdminPanel;
