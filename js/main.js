const apiKey = 'cce3834ed6606295e7fe5ccd1a9856a7';

const cityInput = document.querySelector('#city-input');
const btnInput = document.querySelector('#btn-input');
const containerEl = document.querySelector('.container');

const cityEl = document.querySelector('#city');
const temperatureEl = document.querySelector('#temperature');
const conditionsEl = document.querySelector('#conditions');
const weatherIcon = document.querySelector('#weather-icon');
const humidityEl = document.querySelector('#humidity');
const windEl = document.querySelector('#wind');
const feelsLikeEl = document.querySelector('#feels-like');

const errorMessage = document.querySelector('.error-message');
const todaysDate = document.querySelector('#date')
const weatherDataContainer = document.querySelector('.weather-data');
const dayTimeImg = document.querySelector('.daytime-img');

const now = new Date();
const icon = document.querySelector('#search-icon');

// ***** FUNCTIONS *****
	// ===== LOADER =====
const toggleLoader = () => {
	icon.classList.toggle('fa-spinner');
	containerEl.style.height = '100px';
};

    // ===== SHOW ERROR MESSAGE =====
const showErrorMessage = () => {
    errorMessage.classList.remove('hide');
};

    // ===== SHOW DATE =====
const showDate = (d) => {
    let days = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];
    let months = ["jan.", "fev", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    return `${day}, ${date} ${month} ${year}`;
}

    // ===== CHANGE BACKGROUND IMAGE =====
const time = new Date();
    if (time.getHours() >= 6 && time.getHours() < 20){
        dayTimeImg.style.backgroundImage="url('../img/daytime.jpeg')";
	} else {
	    dayTimeImg.style.backgroundImage="url('../img/nightime.jpeg')"
}  

	// ===== GET WEATHER DATA =====
const getWeatherData = async(city) => {
    toggleLoader();

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiURL);
    const data = await res.json();

    toggleLoader();

    return data;
};

	// ===== SHOW WEATHER DATA =====
const showWeatherData = async (city) => {
	errorMessage.classList.add("hide");
	
	const data = await getWeatherData(city);
	// console.table(data);
	
	if (data.cod === "404") {
		showErrorMessage();
		containerEl.style.height = '250px';
		weatherDataContainer.classList.add("hide");
		return;
	}
	
	cityEl.innerText = `${data.name} |`;
	temperatureEl.innerText = parseInt(data.main.temp);
	conditionsEl.innerText = data.weather[0].description;
	weatherIcon.setAttribute ("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
	humidityEl.innerText = data.main.humidity;
	windEl.innerText = data.main.humidity;
	feelsLikeEl.innerText = parseInt(data.main.feels_like);
	
	todaysDate.innerText = `${showDate(now)}`;
    containerEl.style.height = '570px';
    weatherDataContainer.classList.remove("hide");
	};

// ***** EVENTS ***** 
btnInput.addEventListener("click", () => {
	const city = cityInput.value;
	showWeatherData(city);
	showDate(now);
	});
	
cityInput.addEventListener("keypress", (event) => {
	if (event.code === "Enter") {
	const city = event.target.value;
		
    showWeatherData(city);
	showDate(now);
	}
});

