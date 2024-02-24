// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee-service';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import {MatDialog, MatDialogModule,} from '@angular/material/dialog'
import { DeleteDialogComponent } from '../../componants/delete-dialog/delete-dialog.component';
@Component({
  standalone:true,
  imports:[RouterModule,MatIconModule,MatButtonModule,MatDialogModule,DeleteDialogComponent],
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  deleteSuccessMessage!: string;

  constructor(private employeeService: EmployeeService,private router: Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.employees = this.employeeService.getAllEmployees();
    
  }
  editEmployee(id: number) {
   console.log(id)
   this.router.navigate(['employee/add', { id: id }]);
    }

  deleteEmployee(id:any){
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res){
          this.employees =   this.employeeService.deleteEmployee(id)
        }
      })
  }
}


