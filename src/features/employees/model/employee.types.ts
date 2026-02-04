export type EmployeeRowVm = {
  id: string;
  fullName: string;
  occupation: string;
  department: string;

  employmentStatus: string;
  employmentDate: string;

  terminationStatus: string;
  terminationDate?: string;
};
