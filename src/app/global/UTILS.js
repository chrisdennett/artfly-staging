export const ROUND_TO = (number, decimalPlaces) => {
    // e.g. to 3 decimal places time by 1000, round, then divide by 1000
    const multiplier = Math.pow(10,decimalPlaces);
    return Math.round(number * multiplier) /  multiplier;
};

export const TO_DATE_TEXT = (dateNumber) => {

    const d = new Date(dateNumber);
    const date = d.getDate();
    if(isNaN(date)) return '...';

    const monthIndex = d.getMonth();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
    const year = d.getFullYear();

    return`${date} ${month} ${year}`;
}