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

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const toRowVm = (e: EmployeeJson): EmployeeRowVm => {
  const isTerminated = Boolean(e.terminationDate);

  return {
    id: e.code,
    fullName: e.fullName,
    occupation: e.occupation,
    department: e.department,

    employmentDate: e.dateOfEmployment,
    employmentStatus: isTerminated
      ? "Previously employed"
      : "Currently employed",

    terminationDate: e.terminationDate ?? "",
    terminationStatus: isTerminated ? "Terminated" : "—",
  };
};

export const employeesService = {
  async list(): Promise<EmployeeRowVm[]> {
    await sleep(600);
    return (employeesJson as EmployeeJson[]).map(toRowVm);
  },
};
