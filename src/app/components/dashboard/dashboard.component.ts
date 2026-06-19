import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { DesignationService } from '../../services/designation.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  totalEmployees = 0;
  totalDepartments = 0;
  totalDesignations = 0;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService
  ) {}

  ngOnInit() {

  this.employeeService
    .getEmployees()
    .subscribe(data => {
      this.totalEmployees = data.length;
    });

  this.departmentService
    .getDepartments()
    .subscribe(data => {
      this.totalDepartments = data.length;
    });

  this.designationService
    .getDesignations()
    .subscribe(data => {
      this.totalDesignations = data.length;
    });

}
}