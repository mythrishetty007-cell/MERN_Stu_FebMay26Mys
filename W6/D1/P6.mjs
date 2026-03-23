// Import ES Modules

import createInvoiceLabel,{calculateTotal,taxrate} from "./P5.mjs";

const subtotal = 4000;
const total = calculateTotal(subtotal);
const label = createInvoiceLabel("INV-2026-001");
 
console.log("Invoice Label:",label);
console.log("Tax rate: ",taxrate);
console.log("Final total: ",total);