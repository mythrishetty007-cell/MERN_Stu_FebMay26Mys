function auditReport(reportJSON) {
  // 1. Parse JSON
  const data = JSON.parse(reportJSON);
  const modules = data.modules;
  
  let okCount = 0;
  let failCount = 0;
  const moduleKeys = Object.keys(modules);
 const summary = { okCount, failCount };

  return {
    summaryObject: summary,
    summaryJSON: JSON.stringify(summary)
  };
}
const sampleData = '{"app": "Portal","status": "OK","modules": {"auth": "OK","payment": "OK","results": "FAIL","profile": "OK"}}';
const result = auditReport(sampleData);

console.log("Summary Object:", result.summaryObject);
console.log("Summary JSON:", result.summaryJSON);