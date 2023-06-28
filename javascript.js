//API url https://api.weatherapi.com/v1/current.json?key=caa55f97010a475a877172806232706&q=london
const form  = document.querySelector('form');
const search = document.querySelector('input');
const submitBtn = document.querySelector('button');
const header = document.querySelector('h2');
const degreeType =document.querySelector('.type');
const temp = document.querySelector('.temp');
let weatherObj = null;

async function showWeather(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=caa55f97010a475a877172806232706&q=${city}`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    processWeather(weatherData);
}

function processWeather(weatherData){
   const city = weatherData.location.name;
   const region = weatherData.location.region;
   const tempF = weatherData.current.temp_f;
   const tempC =  weatherData.current.temp_c;
   console.log(city ,"F:", tempF, "C:", tempC);
   header.textContent = `${city}, ${region}`; 
   if (degreeType.textContent == "F:"){
        degreeType.textContent = "F:"
        temp.textContent = tempF + '°';
    }
    else{
        degreeType.textContent = "C:"
        temp.textContent = tempC + '°';
    }
   weatherObj = { city, region, tempC, tempF};
}

function changTempType(){
    if (degreeType.textContent == "F:"){
        degreeType.textContent = "C:"
        temp.textContent = weatherObj.tempC + '°';
    }
    else{
        degreeType.textContent = "F:"
        temp.textContent = weatherObj.tempF + '°';
    }

}


form.addEventListener('submit', (e) =>{
    e.preventDefault();
    showWeather(search.value);
});
degreeType.addEventListener('click', changTempType);

showWeather('London').catch(error => console.log(error));