function calculateNumbers(var1, var2)   {
    var sumTotal = var1 + var2;
    var productTotal = var1 * var2;
    var differenceTotal = var1 - var2;
    var quotientTotal = var1 / var2;
    var remainderTotal = var1 % var2;
    var results = [sumTotal, productTotal, differenceTotal, quotientTotal, remainderTotal];
    return results;
}