//API url https://api.weatherapi.com/v1/current.json?key=caa55f97010a475a877172806232706&q=london

async function showLondonWeather() {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=caa55f97010a475a877172806232706&q=london', {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
}
showLondonWeather();