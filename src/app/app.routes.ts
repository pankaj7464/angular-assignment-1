import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './pages/employee-add-edit/employee-add-edit.component';
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';
export const routes: Routes = [
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'employee/add', component: EmployeeAddEditComponent },
    { path: 'employee/edit/:id', component: EmployeeAddEditComponent },
    { path: '**', component:NotFound404Component  },
];
