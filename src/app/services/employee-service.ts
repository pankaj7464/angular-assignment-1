import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { dummyEmp } from '../../assets/DummyEmp';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees!: Employee[];

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.loadEmployeesFromLocalStorage();
  }

  /**
   * Loads the employees from local storage, or sets them to the default value if no employees are found in local storage.
   */
  private loadEmployeesFromLocalStorage(): void {
    const storedEmployees = localStorage.getItem('employees');
    this.employees = storedEmployees ? JSON.parse(storedEmployees) : dummyEmp;
  }

  /**
   * Saves the current list of employees to local storage.
   */
  private saveEmployeesToLocalStorage(): void {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  /**
   * Opens a snackbar with the given message and optional action.
   *
   * @param message - The message to display in the snackbar.
   * @param action - The text of the action button, or undefined to hide the action button.
   * @param options - Additional options for the snackbar, including duration and CSS classes.
   */
  showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }

  /**
   * Returns a copy of the list of employees
   */
  getAllEmployees(): Employee[] {
    return this.employees;
  }

  /**
   * Returns the employee with the specified ID, or throws an error if the employee is not found.
   *
   * @param id - The ID of the employee to retrieve
   * @returns The employee with the specified ID
   * @throws {Error} If the employee is not found
   */
  getEmployeeById(id: number): Employee {
    const employee = this.employees.find((emp) => emp.employeeId == id);

    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  /**
   * Adds a new employee to the list of employees.
   *
   * @param employee - The employee to add
   */
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
    this.saveEmployeesToLocalStorage();
    this.showSuccessToast(`Employee added ${employee.employeeName}`);
    this.router.navigate(['/employees']);
  }

  /**
Edits an existing employee in the list of employees.
@param id - The ID of the employee to edit
@param updatedEmployee - The updated details of the employee
 */
  editEmployee(id: number, updatedEmployee: Employee): void {
    const index = this.employees.findIndex((emp) => emp.employeeId === id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.saveEmployeesToLocalStorage();
      this.showSuccessToast(`Employee updated ${updatedEmployee.employeeName}`);
      // Example: Navigate to a specific route after editing an employee
      this.router.navigate(['/employees']);
    }
  }

  /**
Deletes an employee from the list of employees.
@param id - The ID of the employee to delete.
@returns A copy of the updated list of employees.
 */
  deleteEmployee(id: number): Employee[] {
    this.employees = this.employees.filter((emp) => emp.employeeId != id);
    this.saveEmployeesToLocalStorage();
    this.showSuccessToast('Employee deleted');
    // Return a copy of the updated array
    this.router.navigate(['/employees']);
    return [...this.employees];
  }
}
