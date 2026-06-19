import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {

  departments: Department[] = [];
  departmentName = '';

  constructor(
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService
      .getDepartments()
      .subscribe(data => {
        this.departments = data;
      });
  }

  addDepartment() {

    if (!this.departmentName.trim()) {
      return;
    }

    this.departmentService
      .addDepartment({
        departmentId: 0,
        departmentName: this.departmentName
      })
      .subscribe(() => {

        this.departmentName = '';

        this.loadDepartments();
      });
  }

  deleteDepartment(id: number) {

    if (confirm('Delete Department?')) {

      this.departmentService
        .deleteDepartment(id)
        .subscribe(() => {

          this.loadDepartments();

        });
    }
  }
}