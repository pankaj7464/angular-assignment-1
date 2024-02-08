// employee-add-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,MatIconModule],
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm!: FormGroup;
  editEmployeeData!:Employee
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      skills: this.formBuilder.array([])
    });


    this.route.params.subscribe(params => {
      const id = params['id'];

      // This will log the id passed from the editEmployee method
      console.log(id); 

      this.employeeService.getEmployeeById(id).subscribe(employee => {
        if (employee) {
          this.editEmployeeData = employee;
          console.log(this.editEmployeeData); // Log the fetched employee data
        } else {
          console.log(`Employee with ID ${id} not found`);
        }
      });
   
    });
  }

  get skills() {
    return this.employeeForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.formBuilder.group({
      name: ['', Validators.required],
      experience: ['', Validators.required]
    }));
  }

  deleteSkill(index: number): void {
    this.skills.removeAt(index);
  }

  submitForm(): void {
    console.log(this.employeeForm)
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value)
      const employee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(employee).subscribe(() => {

        // Redirect to employee list
        this.router.navigate(['/employees']); 
      });
    }
  }
}
