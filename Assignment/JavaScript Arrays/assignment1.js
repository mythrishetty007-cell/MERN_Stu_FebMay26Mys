// Assignment 1
// Employee payroll records
let employees = [
    { name: "Ganesha", basePay: 70000, bonus: 4000, taxRate: 0 },
    { name: "Shiva", basePay: 47000, bonus: 1300, taxRate: 0.01 },
    { name: "Meghana", basePay: -500, bonus: 1000, taxRate: 0.7 }, 
    { name: "Arpitha", basePay: 60000, bonus: 5000, taxRate: 0.14 }
  ];
  let validRecords = employees.filter(emp =>
    emp.basePay > 0 &&
    emp.bonus >= 0 &&
    emp.taxRate >= 0 &&
    emp.taxRate <= 1
  );
  let netPayReport = validRecords.map(emp => {
    let gross = emp.basePay + emp.bonus;
    let netPay = gross - (gross * emp.taxRate);
    return {
      name: emp.name,
      netPay: netPay
    };
  });
  let totalNetPayout = netPayReport.reduce((sum, emp) => {
    return sum + emp.netPay;
  }, 0);
  console.log("Valid Records:", validRecords);
  console.log("Net Pay Report:", netPayReport);
  console.log("Total Net Payout:", totalNetPayout);