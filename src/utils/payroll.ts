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

export const generateSamplePayroll = (num: number, hireDate: string) => {
  const samplePayroll = [];
  const baseSalary = 4000000;
  const hireDateObj = new Date(hireDate);

  for (let i = 0; i < num; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);

    const monthsSinceHire =
      (date.getFullYear() - hireDateObj.getFullYear()) * 12 +
      date.getMonth() -
      hireDateObj.getMonth();
    const increments = Math.floor(monthsSinceHire / 3);
    const amount = Math.floor(baseSalary * Math.pow(1.05, increments));

    samplePayroll.push({ date: date.toISOString().split("T")[0], amount });
  }

  return samplePayroll;
};
