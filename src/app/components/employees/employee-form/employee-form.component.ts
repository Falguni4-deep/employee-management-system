import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { EmployeeService } from '../../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../models/employee';
import { Department } from '../../../models/department';
import { Designation } from '../../../models/designation';
import { DepartmentService } from '../../../services/department.service';
import { DesignationService } from '../../../services/designation.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  employeeForm!: FormGroup;
  employeeId = 0;
  isEditMode = false;

  departments: Department[] = [];
  designations: Designation[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    // ✅ SINGLE FORM INIT (FIXED)
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      departmentId: ['', Validators.required],
      designationId: ['', Validators.required],
      salary: ['', Validators.required],
      employeeType: ['', Validators.required]
    });

    // Load dropdown data
    this.departmentService.getDepartments()
      .subscribe(data => {
        this.departments = data;
      });

    this.designationService.getDesignations()
      .subscribe(data => {
        this.designations = data;
      });

    // Get ID from route
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ EDIT MODE FIXED (ASYNC HANDLING)
    if (this.employeeId) {
      this.isEditMode = true;

      this.employeeService.getEmployeeById(this.employeeId)
        .subscribe((employee: Employee) => {
          if (employee) {
            this.employeeForm.patchValue({
              fullName: employee.fullName,
              email: employee.email,
              phone: employee.phone,
              gender: employee.gender,
              departmentId: employee.departmentId,
              designationId: employee.designationId,
              salary: employee.salary,
              employeeType: employee.employeeType
            });
          }
        });
    }
  }

  saveEmployee() {

    if (this.employeeForm.invalid) {
      return;
    }

    const employee: Employee = {
      ...this.employeeForm.value,
      employeeId: this.employeeId
    };

    if (this.isEditMode) {

      this.employeeService.updateEmployee(employee)
        .subscribe(() => {
          alert('Employee Updated Successfully');
          this.router.navigate(['/employees']);
        });

    } else {

      this.employeeService.addEmployee(this.employeeForm.value)
        .subscribe(() => {
          alert('Employee Added Successfully');
          this.router.navigate(['/employees']);
        });
    }
  }
}