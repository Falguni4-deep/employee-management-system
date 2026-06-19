import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path:'employees', component: EmployeeListComponent, canActivate: [authGuard]},
    {path:'add-employee', component: EmployeeFormComponent, canActivate: [authGuard]},
    {path: 'edit-employee/:id', component: EmployeeFormComponent, canActivate: [authGuard]},
    {path:'departments', component: DepartmentsComponent, canActivate: [authGuard]},
    {path:'designations', component: DesignationsComponent, canActivate: [authGuard]},
    {path:'login', component: LoginComponent},
    {path:'**', component: NotFoundComponent}
];
