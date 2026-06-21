import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =
'https://employeemanagementapi-1.onrender.com/api/Employees';

  constructor(
    private http: HttpClient
  ) {}

  getEmployees():
    Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.apiUrl
    );
  }

  addEmployee(
    employee: Employee
  ) {
    return this.http.post(
      this.apiUrl,
      employee
    );
  }

  updateEmployee(
    employee: Employee
  ) {
    return this.http.put(
      `${this.apiUrl}/${employee.employeeId}`,
      employee
    );
  }

  deleteEmployee(
    id: number
  ) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
  getEmployeeById(id: number) {
  return this.http.get<Employee>(
    `${this.apiUrl}/${id}`
  );
}
}

// import { Injectable } from '@angular/core';
// import { Employee } from '../models/employee';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   private employees: Employee[] = [];

//   constructor() {
//     const data = localStorage.getItem('employees');

//     if (data) {
//       this.employees = JSON.parse(data);
//     }
//   }

//   getEmployees(): Employee[] {
//     return this.employees;
//   }

//   addEmployee(employee: Employee) {

//     employee.employeeId =
//       this.employees.length + 1;

//     this.employees.push(employee);

//     localStorage.setItem(
//       'employees',
//       JSON.stringify(this.employees)
//     );
//   }

//   deleteEmployee(id: number) {

//     this.employees =
//       this.employees.filter(
//         emp => emp.employeeId !== id
//       );

//     localStorage.setItem(
//       'employees',
//       JSON.stringify(this.employees)
//     );
//   }

//   getEmployeeById(id: number) {
//   return this.employees.find(
//     emp => emp.employeeId === id
//   );
// }

// updateEmployee(updatedEmployee: Employee) {

//   const index =
//     this.employees.findIndex(
//       emp =>
//         emp.employeeId ===
//         updatedEmployee.employeeId
//     );

//   if (index !== -1) {
//     this.employees[index] =
//       updatedEmployee;

//     localStorage.setItem(
//       'employees',
//       JSON.stringify(this.employees)
//     );
//   }
// }

// }