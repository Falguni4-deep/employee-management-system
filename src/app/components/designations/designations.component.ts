import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Designation } from '../../models/designation';
import { DesignationService } from '../../services/designation.service';

@Component({
  selector: 'app-designations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css']
})
export class DesignationsComponent {

  designations: Designation[] = [];
  designationName = '';

  constructor(
    private designationService: DesignationService
  ) {}

  ngOnInit() {
    this.loadDesignations();
  }

  loadDesignations() {
    this.designationService
      .getDesignations()
      .subscribe(data => {
        this.designations = data;
      });
  }

  addDesignation() {

    if (!this.designationName.trim()) {
      return;
    }

    this.designationService
      .addDesignation({
        designationId: 0,
        designationName: this.designationName
      })
      .subscribe(() => {

        this.designationName = '';

        this.loadDesignations();
      });
  }

  deleteDesignation(id: number) {

    if (confirm('Delete Designation?')) {

      this.designationService
        .deleteDesignation(id)
        .subscribe(() => {

          this.loadDesignations();

        });
    }
  }
}