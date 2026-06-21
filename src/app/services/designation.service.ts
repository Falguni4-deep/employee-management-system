import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../models/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiUrl =
    'https://employeemanagementapi-1.onrender.com/api/Designations';

  constructor(private http: HttpClient) {}

  getDesignations(): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.apiUrl);
  }

  addDesignation(designation: Designation) {
    return this.http.post(this.apiUrl, designation);
  }

  deleteDesignation(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}