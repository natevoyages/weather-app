const form  = document.querySelector('form');
const search = document.querySelector('input');
const degreeBtn = document.querySelector('.degree-btn');
const header = document.querySelector('h2');
const degreeType =document.querySelector('.type');
const temp = document.querySelector('.temp');
const weatherCondition = document.querySelector('.condition');
const weatherIcon = document.querySelector('.icon');
const loading = document.querySelector('.loading');
let weatherObj = null;

async function showWeather(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=caa55f97010a475a877172806232706&q=${city}`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    processWeather(weatherData);
    loading.style.display = 'none';
}

   function processWeather(weatherData){
   const city = weatherData.location.name;
   const region = weatherData.location.region;
   const tempF = weatherData.current.temp_f;
   const tempC =  weatherData.current.temp_c;


   weatherCondition.textContent = weatherData.current.condition.text;
   weatherGif(weatherCondition.textContent);

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

async function weatherGif(weather){    
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=VFAHZCGwSohWZhkdnXXTfknwib3GTVYk&s=${weather}`, {mode: 'cors'});
    const responseData = await response.json();
    weatherIcon.src = responseData.data.images.original.url;
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();
    loading.style.display = 'block';
    showWeather(search.value).catch(error => 
        {   loading.textContent = "ERROR";
            console.log(error)});
});
degreeBtn.addEventListener('click', changTempType);

showWeather('London').catch(error => console.log(error));