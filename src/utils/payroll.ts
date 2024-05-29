export const calculateNewSalary = (
  baseSalary: number,
  hireDate: string
): number => {
  const hireDateObj = new Date(hireDate);
  const currentDate = new Date();
  const monthsWorked =
    (currentDate.getFullYear() - hireDateObj.getFullYear()) * 12 +
    (currentDate.getMonth() - hireDateObj.getMonth());

  const raiseIntervals = Math.floor(monthsWorked / 3);
  let newSalary = baseSalary;

  for (let i = 0; i < raiseIntervals; i++) {
    newSalary += newSalary * 0.05;
  }

  return Math.floor(newSalary);
};
