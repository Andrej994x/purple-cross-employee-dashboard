const isFuture = (iso?: string) => {
  if (!iso) return false
  const d = new Date(iso)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d.getTime() > today.getTime()
}

export const employmentStatusLabel = (employmentDate?: string) => {
  if (!employmentDate) return "—"
  return isFuture(employmentDate) ? "Employed soon" : "Currently employed"
}

export const terminationStatusLabel = (terminationDate?: string) => {
  if (!terminationDate) return "—"
  return isFuture(terminationDate) ? "To be terminated" : "Terminated"
}
