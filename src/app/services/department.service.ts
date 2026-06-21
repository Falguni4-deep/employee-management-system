import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl =
    'https://employeemanagementapi-1.onrender.com/api/Departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  addDepartment(department: Department) {
    return this.http.post(this.apiUrl, department);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}