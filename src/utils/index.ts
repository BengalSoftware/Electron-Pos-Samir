// Create a new Date object
const currentDate = new Date();

// Get the day, month, and year components
const day = currentDate.getDate();       // 1-31
const month = currentDate.getMonth() + 1; // 0-11 (January is 0, so add 1)
const year = currentDate.getFullYear();   // 4-digit year

// Create a formatted date string
const formateDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;


export { formateDate };

