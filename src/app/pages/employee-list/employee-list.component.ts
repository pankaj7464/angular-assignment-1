// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee-service';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone:true,
  imports:[RouterModule,MatIconModule],
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  deleteSuccessMessage!: string;

  constructor(private employeeService: EmployeeService,private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
  editEmployee(id: number) {
   console.log(id)
   this.router.navigate(['employee/add', { id: id }]);
   
    }

  deleteEmployee(id: number): void {
   
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        // Refresh employee list after deletion
        
        this.loadEmployees(); 
      });
    }
  }
}


