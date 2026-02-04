import type { EmployeeRowVm } from "@/features/employees/model/employee.types";
import employeesJson from "@/features/data/employees.json";

export type EmployeeJson = {
  code: string;
  fullName: string;
  occupation: string;
  department: string;
  dateOfEmployment: string;
  terminationDate: string | null;
};

export type EmployeeMeta = {
  occupations: string[];
  departments: string[];
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const toRowVm = (e: EmployeeJson): EmployeeRowVm => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const employmentDt = e.dateOfEmployment ? new Date(e.dateOfEmployment) : null;
  if (employmentDt) employmentDt.setHours(0, 0, 0, 0);

  const terminationDt = e.terminationDate ? new Date(e.terminationDate) : null;
  if (terminationDt) terminationDt.setHours(0, 0, 0, 0);

  const employmentStatus =
    !employmentDt ? "/" : employmentDt.getTime() > today.getTime() ? "Employed soon" : "Currently employed";

  const terminationStatus =
    !terminationDt ? "/" : terminationDt.getTime() > today.getTime() ? "To be terminated" : "Terminated";

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

const computeMetaFromJson = (data: EmployeeJson[]): EmployeeMeta => {
  const occ = new Set<string>();
  const dep = new Set<string>();

  for (const e of data) {
    if (e.occupation) occ.add(e.occupation);
    if (e.department) dep.add(e.department);
  }

  return {
    occupations: Array.from(occ).sort((a, b) => a.localeCompare(b)),
    departments: Array.from(dep).sort((a, b) => a.localeCompare(b)),
  };
};

const META = computeMetaFromJson(employeesJson as EmployeeJson[]);

export const employeesService = {
  async list(): Promise<EmployeeRowVm[]> {
    await sleep(400);
    return (employeesJson as EmployeeJson[]).map(toRowVm);
  },

  async meta(): Promise<EmployeeMeta> {
    await sleep(150);
    return META;
  },
};
