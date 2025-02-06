let is24HourFormat = true;
let cities = {
  'New York': -5,
  'London': 0,
  'Tokyo': 9,
  'Paris': 1,
  'Sydney': 11
};

let customCities = [];

function toggleFormat() {
  is24HourFormat = document.getElementById('format-toggle').checked;
  updateCityTime();
}

function updateTime(city, offset, elementId) {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const localTime = new Date(utc + (3600000 * offset));

  const hours = localTime.getHours();
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();
  
  const dayOfWeek = localTime.toLocaleString('en-US', { weekday: 'long' });
  const currentDate = localTime.toLocaleDateString();
  
  const timeString = formatTime(hours, minutes, seconds);
  const dateString = `${dayOfWeek}, ${currentDate}`;

  document.getElementById(elementId).innerHTML = `
    <h2>${city}</h2>
    <p class="time">${timeString}</p>
    <p class="date">${dateString}</p>
  `;
}

function formatTime(hours, minutes, seconds) {
  if (!is24HourFormat) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${formatTimeDigits(minutes)}:${formatTimeDigits(seconds)} ${period}`;
  }
  return `${formatTimeDigits(hours)}:${formatTimeDigits(minutes)}:${formatTimeDigits(seconds)}`;
}

function formatTimeDigits(num) {
  return num < 10 ? '0' + num : num;
}

function addCustomCity() {
  const city = document.getElementById('custom-city').value;
  if (city && !customCities.includes(city)) {
    customCities.push(city);
    cities[city] = 0;
    updateCityTime();
    document.getElementById('custom-city').value = '';
  }
}

function updateCityTime() {
  const selectedCity = document.getElementById('city-select').value;
  const cityData = cities[selectedCity];
  document.getElementById('clock-container').innerHTML = '';

  updateTime(selectedCity, cityData, 'clock-container');

  customCities.forEach(city => {
    updateTime(city, 0, 'clock-container');
  });
}

updateCityTime();
