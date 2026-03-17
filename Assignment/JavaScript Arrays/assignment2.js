// Assignment 2
// Permission rules array
let rules = [
    { role: "admin", action: "READ", allowed: true },
    { role: "student", action: "WRITE", allowed: true },
    { role: "student", action: "READ", allowed: true },
    { role: "admin", action: "WRITE", allowed: false },
    { role: "guest", action: "READ", allowed: true }
  ];
  
  let allowedRules = rules.filter(rule => rule.allowed === true);
  
  let allowedPairs = allowedRules.map(rule => {
    return rule.role + ":" + rule.action;
  });

  let summary = allowedRules.reduce((acc, rule) => {
    if (!acc[rule.role]) {
      acc[rule.role] = 0;
    }
    acc[rule.role]++;
    return acc;
  }, {});

  console.log("Allowed Rules: ", allowedRules);
  console.log("Allowed Pairs: ", allowedPairs);
  console.log("Summary: ", summary);