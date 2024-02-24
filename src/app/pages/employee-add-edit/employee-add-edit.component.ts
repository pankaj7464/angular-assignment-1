// employee-add-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee, Skill } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm!: FormGroup;
  editEmployeeData!: Employee;
  isEditForm = false;
  constructor(
    private formBuilder: FormBuilder,
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
      skills: this.formBuilder.array([this.formBuilder.group({
        name:['',Validators.required],
        experience: ['',Validators.required]
      })])
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      // This will log the id passed from the editEmployee method
      const employee = this.employeeService.getEmployeeById(id)
      console.log(employee)
      this.employeeForm.patchValue(employee);
      this.isEditForm = true;
      this.initializeSkillsFormArray(employee.skills);
    });
  }
  initializeSkillsFormArray(skills: Skill[]): void {
    const skillsFormArray = this.employeeForm.get('skills') as FormArray;
    skillsFormArray.clear();
    skills.forEach(skill => {
      skillsFormArray.push(
        this.formBuilder.group({
          name: [skill.name, Validators.required],
          experience: [skill.experience, Validators.required]
        })
      );
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
      console.log("Invalid form ")
      const employee: Employee = this.employeeForm.value;

      if (this.isEditForm) {
        // If employeeId exists, it means it's an edit operation
        this.employeeService.editEmployee(employee.employeeId, employee);

      } else {
        // If employeeId does not exist, it means it's an add operation
        this.employeeService.addEmployee(employee);

      }
    }
    else{
      console.log("Invalid form ")
    }
  }

}

