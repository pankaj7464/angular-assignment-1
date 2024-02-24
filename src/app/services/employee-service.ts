import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { dummyEmp } from '../../assets/DummyEmp';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees!: Employee[];

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.loadEmployeesFromLocalStorage();
  }

  private loadEmployeesFromLocalStorage(): void {
    const storedEmployees = localStorage.getItem('employees');
    this.employees = storedEmployees ? JSON.parse(storedEmployees) : dummyEmp;
  }

  private saveEmployeesToLocalStorage(): void {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }

  getAllEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee {
    const employee = this.employees.find(emp => emp.employeeId == id);

    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
    this.saveEmployeesToLocalStorage();
    this.showSuccessToast(`Employee added ${employee.employeeName}`);
    this.router.navigate(['/employees']);
  }

  editEmployee(id: number, updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp.employeeId === id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.saveEmployeesToLocalStorage();
      this.showSuccessToast(`Employee updated ${updatedEmployee.employeeName}`);
      // Example: Navigate to a specific route after editing an employee
      this.router.navigate(['/employees']);
    }
  }

  deleteEmployee(id: number): Employee[] {
    this.employees = this.employees.filter(emp => emp.employeeId != id);
    this.saveEmployeesToLocalStorage();
    this.showSuccessToast("Employee deleted")
    // Return a copy of the updated array
    this.router.navigate(['/employees']); 
    return [...this.employees]; 
  }
}
