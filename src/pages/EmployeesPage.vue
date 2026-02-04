<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-semibold tracking-tight">Employees</h2>
        <p class="text-sm text-muted-foreground">View and manage employee records</p>
      </div>

      <Button class="sm:self-end">Create Employee</Button>
    </div>

    <div class="rounded-md border bg-background p-4">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div class="grid w-full gap-2 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-3">
          <Input placeholder="Search (name, occupation...)" />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name_asc">Name (A → Z)</SelectItem>
              <SelectItem value="name_desc">Name (Z → A)</SelectItem>
              <SelectItem value="employment_new">Employment (Newest)</SelectItem>
              <SelectItem value="employment_old">Employment (Oldest)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm">Clear</Button>
          <Button variant="outline" size="sm">Apply</Button>
        </div>
      </div>
    </div>

    <div class="rounded-md border bg-background">
      <div class="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[40px]">
                <Checkbox aria-label="Select all" />
              </TableHead>

              <TableHead>Full Name</TableHead>

              <TableHead class="hidden md:table-cell">Occupation</TableHead>
              <TableHead class="hidden lg:table-cell">Department</TableHead>

              <TableHead>Date of Employment</TableHead>
              <TableHead class="hidden md:table-cell">Termination Date</TableHead>

              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-for="emp in demoRows" :key="emp.id">
              <TableCell class="w-[40px]">
                <Checkbox aria-label="Select row" />
              </TableCell>

              <TableCell class="font-medium">
                <div class="flex flex-col">
                  <span class="truncate max-w-[220px] sm:max-w-none">{{ emp.fullName }}</span>

                  <div class="mt-1 flex flex-col gap-1 text-xs text-muted-foreground md:hidden">
                    <span>{{ emp.occupation }}</span>
                    <span>{{ emp.department }}</span>
                    <span class="flex items-center gap-2">
                      <Badge variant="secondary">{{ emp.employmentStatus }}</Badge>
                      <span>•</span>
                      <Badge variant="secondary">{{ emp.terminationStatus }}</Badge>
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell class="hidden md:table-cell">{{ emp.occupation }}</TableCell>
              <TableCell class="hidden lg:table-cell">{{ emp.department }}</TableCell>

              <TableCell>
                <div class="flex flex-col gap-1">
                  <Badge variant="secondary">{{ emp.employmentStatus }}</Badge>
                  <span class="text-xs text-muted-foreground hidden sm:block">{{ emp.employmentDate }}</span>
                </div>
              </TableCell>

              <TableCell class="hidden md:table-cell">
                <div class="flex flex-col gap-1">
                  <Badge variant="secondary">{{ emp.terminationStatus }}</Badge>
                  <span class="text-xs text-muted-foreground">{{ emp.terminationDate || "—" }}</span>
                </div>
              </TableCell>

              <TableCell class="text-right">
                <div class="flex justify-end gap-1">
                  <Dialog>
                    <DialogTrigger as-child>
                      <Button variant="ghost" size="icon" aria-label="View">
                        <Eye class="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent class="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Employee Profile</DialogTitle>
                        <DialogDescription>Read-only view (UI only for now)</DialogDescription>
                      </DialogHeader>

                      <div class="grid gap-3 py-2 text-sm">
                        <div class="grid grid-cols-3 gap-2">
                          <div class="text-muted-foreground">Full Name</div>
                          <div class="col-span-2 font-medium">{{ emp.fullName }}</div>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <div class="text-muted-foreground">Occupation</div>
                          <div class="col-span-2">{{ emp.occupation }}</div>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <div class="text-muted-foreground">Department</div>
                          <div class="col-span-2">{{ emp.department }}</div>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <div class="text-muted-foreground">Employment</div>
                          <div class="col-span-2">{{ emp.employmentStatus }}</div>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <div class="text-muted-foreground">Termination</div>
                          <div class="col-span-2">{{ emp.terminationStatus }}</div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline">Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger as-child>
                      <Button variant="ghost" size="icon" aria-label="Edit">
                        <Pencil class="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent class="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                        <DialogDescription>Form placeholder (no saving yet)</DialogDescription>
                      </DialogHeader>

                      <div class="grid gap-3 py-2">
                        <div class="grid gap-2">
                          <label class="text-sm text-muted-foreground">Full Name</label>
                          <Input :model-value="emp.fullName" disabled />
                        </div>

                        <div class="grid gap-2 sm:grid-cols-2">
                          <div class="grid gap-2">
                            <label class="text-sm text-muted-foreground">Occupation</label>
                            <Input :model-value="emp.occupation" disabled />
                          </div>
                          <div class="grid gap-2">
                            <label class="text-sm text-muted-foreground">Department</label>
                            <Input :model-value="emp.department" disabled />
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger as-child>
                      <Button variant="ghost" size="icon" aria-label="Delete">
                        <Trash2 class="h-4 w-4 text-red-600" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent class="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Delete employee?</DialogTitle>
                        <DialogDescription>
                          This will remove <span class="font-medium">{{ emp.fullName }}</span> from the list.
                          (UI only for now)
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div class="flex flex-col gap-2 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div class="text-muted-foreground">0 of {{ demoRows.length }} row(s) selected.</div>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground">Rows per page</span>
          <Select>
            <SelectTrigger class="w-[90px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <div class="ml-2 flex items-center gap-1">
            <Button variant="outline" size="icon" aria-label="Prev">
              <ChevronLeft class="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next">
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const demoRows = [
  {
    id: "1",
    fullName: "John Doe",
    occupation: "Pharmacist",
    department: "Operations",
    employmentStatus: "Currently employed",
    employmentDate: "2021-02-10",
    terminationStatus: "—",
    terminationDate: "",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    occupation: "Analyst",
    department: "Finance",
    employmentStatus: "Employed soon",
    employmentDate: "2026-03-01",
    terminationStatus: "To be terminated",
    terminationDate: "2026-06-01",
  },
];
</script>
