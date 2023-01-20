import { Employee } from '../models/employee';

import agent from '../lib/agent';
import { CreateEmployeeRequest } from '../models/request/employee/createEmployeeRequest';

const BASE_URL = '/employee';

const employeeService = {
  getEmployees: () => agent.get<Employee[]>(BASE_URL),
  addEmployee: (createEmployeeRequest: CreateEmployeeRequest) => agent.post<any>(BASE_URL, createEmployeeRequest),
};

export default employeeService;
