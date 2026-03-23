// commonJS export and import

function calculateTax(amount){
    return amount*0.18;
}

function applyDiscount(amount,percent){
    return amount - amount * (percent/100);
}

function formatCurrency(amount){
    return "INR "+amount.toFixed(2); //toFixed is used for floating point 
}
// module.exports makes these functions available to require()
module.exports = {calculateTax,applyDiscount,formatCurrency};