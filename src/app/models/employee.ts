export interface Employee {
  employeeId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  departmentId: number;
  designationId: number;
  salary: number;
  employeeType: string;

  departmentName?: string;
  designationName?: string;
}