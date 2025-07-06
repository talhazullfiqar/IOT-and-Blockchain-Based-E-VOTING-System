// Get current day of the year (1–366)
function getCurrentDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Get current month (1–12)
function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

// Get current hour in 12-hour format (1–12)
function getCurrentHour12() {
  const hour = new Date().getHours();
  return hour % 12 === 0 ? 12 : hour % 12;
}
// get current Minute of hour
function getCurrentMinute() {
  return new Date().getMinutes();
}
// Get current AM or PM
function getCurrentAMPM() {
  return new Date().getHours() >= 12 ? "PM" : "AM";
}

// Get current year (e.g., 2025)
function getCurrentYear() {
  return new Date().getFullYear();
}

// current day of month
function getCurrentDayOfMonth() {
  const now = new Date();
  return now.getDate();
}

// Export functions if using in modules (Uncomment if needed)
export {
  getCurrentDayOfYear,
  getCurrentMonth,
  getCurrentHour12,
  getCurrentMinute,
  getCurrentAMPM,
  getCurrentYear,
  getCurrentDayOfMonth,
};
