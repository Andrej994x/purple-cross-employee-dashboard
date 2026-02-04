import type { EmployeeRowVm } from "@/features/employees/model/employee.types";
import employeesJson from "@/features/data/employees.json";

type EmployeeJson = {
  code: string;
  fullName: string;
  occupation: string;
  department: string;
  dateOfEmployment: string; 
  terminationDate: string | null; 
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const toRowVm = (e: EmployeeJson): EmployeeRowVm => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const employmentDt = e.dateOfEmployment ? new Date(e.dateOfEmployment) : null;
  if (employmentDt) employmentDt.setHours(0, 0, 0, 0);

  const terminationDt = e.terminationDate ? new Date(e.terminationDate) : null;
  if (terminationDt) terminationDt.setHours(0, 0, 0, 0);

  const employmentStatus = !employmentDt
    ? "/"
    : employmentDt.getTime() > today.getTime()
      ? "Employed soon"
      : "Currently employed";

  const terminationStatus = !terminationDt
    ? "/"
    : terminationDt.getTime() > today.getTime()
      ? "To be terminated"
      : "Terminated";

  return {
    id: e.code,
    fullName: e.fullName,
    occupation: e.occupation,
    department: e.department,

    employmentDate: e.dateOfEmployment || "",
    employmentStatus,

    terminationDate: e.terminationDate ?? "",
    terminationStatus,
  };
};

export const employeesService = {
  async list(): Promise<EmployeeRowVm[]> {
    await sleep(600);
    return (employeesJson as EmployeeJson[]).map(toRowVm);
  },
};
