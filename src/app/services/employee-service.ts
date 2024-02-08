// employee.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';
import {dummyEmp} from '../../assets/DummyEmp'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = dummyEmp; 
  private deleteSuccessMessage!: string;

  constructor() { }

  

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }
  
  
  getEmployeeById(id: number): Observable<Employee | undefined> {
    console.log(id + " comming from service")
    const employee = dummyEmp.find(emp => emp.id == id);
    console.log(employee)
    return of(employee);
  }

  addEmployee(employee: Employee): Observable<void> {
    // Implement logic to add employee
    return of();
  }

  editEmployee(employee: Employee): Observable<void> {
    // Implement logic to edit employee
    return of();
  }

  deleteEmployee(id: number): Observable<void> {
    // Implement logic to delete employee
    const employee = dummyEmp.find(emp => emp.id == id);
    console.log(employee)
    this.deleteSuccessMessage = `The Employee ${employee?.name} is deleted successfully.`;
    return of();
  }
}
