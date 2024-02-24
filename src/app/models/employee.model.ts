// employee.model.ts
export interface Employee {
    employeeId: number;
    employeeName: string;
    email: string;
    contactNumber: string;
    gender: string;
    skills: Skill[];
  }
  
  export interface Skill {
    name: string;
    experience: string;
  }
  