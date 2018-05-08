export const ROUND_TO = (number, decimalPlaces) => {
    // e.g. to 3 decimal places time by 1000, round, then divide by 1000
    const multiplier = Math.pow(10,decimalPlaces);
    return Math.round(number * multiplier) /  multiplier;
};