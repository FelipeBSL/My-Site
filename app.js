(function () {
  // Fallback location used if browser geolocation is unavailable or denied.
  var FALLBACK = { lat: 4.7110, lon: -74.0721, name: 'Bogotá, Colombia' };

  var WEATHER_CODES = {
    0:  { label: 'Clear sky',        icon: 'sun' },
    1:  { label: 'Mostly clear',     icon: 'sun' },
    2:  { label: 'Partly cloudy',    icon: 'cloud-sun' },
    3:  { label: 'Overcast',         icon: 'cloud' },
    45: { label: 'Fog',              icon: 'fog' },
    48: { label: 'Depositing fog',   icon: 'fog' },
    51: { label: 'Light drizzle',    icon: 'drizzle' },
    53: { label: 'Drizzle',          icon: 'drizzle' },
    55: { label: 'Dense drizzle',    icon: 'drizzle' },
    61: { label: 'Light rain',       icon: 'rain' },
    63: { label: 'Rain',             icon: 'rain' },
    65: { label: 'Heavy rain',       icon: 'rain' },
    66: { label: 'Freezing rain',    icon: 'rain' },
    67: { label: 'Freezing rain',    icon: 'rain' },
    71: { label: 'Light snow',       icon: 'snow' },
    73: { label: 'Snow',             icon: 'snow' },
    75: { label: 'Heavy snow',       icon: 'snow' },
    77: { label: 'Snow grains',      icon: 'snow' },
    80: { label: 'Rain showers',     icon: 'rain' },
    81: { label: 'Rain showers',     icon: 'rain' },
    82: { label: 'Violent showers',  icon: 'rain' },
    85: { label: 'Snow showers',     icon: 'snow' },
    86: { label: 'Snow showers',     icon: 'snow' },
    95: { label: 'Thunderstorm',     icon: 'storm' },
    96: { label: 'Thunderstorm',     icon: 'storm' },
    99: { label: 'Thunderstorm',     icon: 'storm' }
  };

  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4.2"/><path stroke-linecap="round" d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/>',
    'cloud-sun': '<circle cx="8.3" cy="8.3" r="3.4"/><path stroke-linecap="round" d="M8.3 2.7v1.7M3.6 8.3H1.9M13 8.3h-1M4.5 4.5l1.2 1.2M12.1 4.5l-1.2 1.2"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 15.8a4 4 0 0 1 1-7.9 4.6 4.6 0 0 1 8.7 1.6 3.4 3.4 0 0 1-.9 6.7H8.9"/>',
    cloud: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 17.5a4 4 0 0 1 .6-7.9 5.2 5.2 0 0 1 10 1.4 3.6 3.6 0 0 1-.8 7H7.2"/>',
    fog: '<path stroke-linecap="round" d="M4 9h16M3 12.5h18M4 16h16M6 19.5h12"/>',
    drizzle: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 13.2a4 4 0 0 1 .6-7.9 5.2 5.2 0 0 1 10 1.4 3.6 3.6 0 0 1-.8 7H7.2"/><path stroke-linecap="round" d="M8.5 18.5l-1 2M12.5 18.5l-1 2M16.5 18.5l-1 2"/>',
    rain: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 12.7a4 4 0 0 1 .6-7.9 5.2 5.2 0 0 1 10 1.4 3.6 3.6 0 0 1-.8 7H7.2"/><path stroke-linecap="round" d="M8 17l-1.4 3M13 17l-1.4 3M18 17l-1.4 3"/>',
    snow: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 12.7a4 4 0 0 1 .6-7.9 5.2 5.2 0 0 1 10 1.4 3.6 3.6 0 0 1-.8 7H7.2"/><path stroke-linecap="round" d="M8 17.5v3M6.6 19h2.8M13 17.5v3M11.6 19h2.8M18 17.5v3M16.6 19h2.8"/>',
    storm: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 11.8a4 4 0 0 1 .6-7.9 5.2 5.2 0 0 1 10 1.4 3.6 3.6 0 0 1-.8 7H7.2"/><path stroke-linecap="round" stroke-linejoin="round" d="M13 14l-3 4.5h2.6L11 22"/>'
  };

  function iconMarkup(key) {
    var body = ICONS[key] || ICONS.cloud;
    return '<svg viewBox="0 0 24 24">' + body + '</svg>';
  }

  function render(data, locationName) {
    var w = data.current_weather;
    var info = WEATHER_CODES[w.weathercode] || { label: 'Unclear skies', icon: 'cloud' };

    document.getElementById('weather-icon').innerHTML = iconMarkup(info.icon);
    document.getElementById('weather-temp').innerHTML =
      Math.round(w.temperature) + '<span class="unit">°C</span>';
    document.getElementById('weather-condition').textContent = info.label;
    document.getElementById('weather-location').textContent = locationName;

    document.getElementById('weather-meta').innerHTML =
      '<div class="weather-meta-item">' +
        '<span class="weather-meta-label">Wind</span>' +
        '<span class="weather-meta-value">' + Math.round(w.windspeed) + ' km/h</span>' +
      '</div>' +
      '<div class="weather-meta-item">' +
        '<span class="weather-meta-label">Updated</span>' +
        '<span class="weather-meta-value">' +
          new Date(w.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        '</span>' +
      '</div>';
  }

  function showError() {
    document.getElementById('weather-condition').innerHTML =
      '<span class="weather-status">Weather unavailable right now</span>';
  }

  function fetchWeather(lat, lon, locationName) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
      '&longitude=' + lon + '&current_weather=true';

    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) { render(data, locationName); })
      .catch(showError);
  }

  function resolveLocationName(lat, lon, fallback) {
    var url = 'https://geocoding-api.open-meteo.com/v1/reverse?latitude=' + lat +
      '&longitude=' + lon + '&count=1&language=en';

    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.results && data.results.length) {
          var r = data.results[0];
          return [r.name, r.admin1, r.country].filter(Boolean).join(', ');
        }
        return fallback;
      })
      .catch(function () { return fallback; });
  }

  function useCoords(lat, lon, fallbackName) {
    resolveLocationName(lat, lon, fallbackName).then(function (name) {
      fetchWeather(lat, lon, name);
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        useCoords(pos.coords.latitude, pos.coords.longitude, 'Your location');
      },
      function () {
        useCoords(FALLBACK.lat, FALLBACK.lon, FALLBACK.name);
      },
      { timeout: 6000 }
    );
  } else {
    useCoords(FALLBACK.lat, FALLBACK.lon, FALLBACK.name);
  }
})();
