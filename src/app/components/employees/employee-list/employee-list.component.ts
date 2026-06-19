import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../services/department.service';
import { DesignationService } from '../../../services/designation.service';
import { Department } from '../../../models/department';
import { Designation } from '../../../models/designation';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule,RouterModule,NavbarComponent,FormsModule],
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  employees: Employee[] = [];
  allEmployees: Employee[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];
  searchText = '';

constructor(
  private employeeService: EmployeeService,
   private departmentService: DepartmentService,
  private designationService: DesignationService
) {}

ngOnInit() {

  this.departmentService
    .getDepartments()
    .subscribe(depts => {

      this.departments = depts;

      this.designationService
        .getDesignations()
        .subscribe(desigs => {

          this.designations = desigs;

          this.loadEmployees();

        });

    });

}

loadEmployees() {

  this.employeeService
    .getEmployees()
    .subscribe(data => {

      data.forEach(emp => {

        const dept =
          this.departments.find(
            d => d.departmentId === emp.departmentId
          );

        const des =
          this.designations.find(
            d => d.designationId === emp.designationId
          );

        emp.departmentName =
          dept?.departmentName || '-';

        emp.designationName =
          des?.designationName || '-';

      });

      this.employees = data;
      this.allEmployees = [...data];

    });

}

  deleteEmployee(id: number) {

  if (confirm('Delete Employee?')) {

    this.employeeService
      .deleteEmployee(id)
      .subscribe(() => {

        this.loadEmployees();

      });

  }
}

searchEmployee() {

  if (!this.searchText.trim()) {

    this.employees = [...this.allEmployees];

    return;
  }

  const text =
    this.searchText.toLowerCase();

  this.employees =
    this.allEmployees.filter(emp =>

      emp.fullName
        .toLowerCase()
        .includes(text)

      ||

      emp.email
        .toLowerCase()
        .includes(text)

    );
}
}
