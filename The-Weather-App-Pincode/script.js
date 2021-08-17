// Openweathermap API.
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");

// add your openweather api Keys.
const api = 'xxxxxxxxxxxxxxxxxx';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value
        const url = `https://api.postalpincode.in/pincode/${inputVal}`;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((info) => {
            const city = info[0].PostOffice[0].Region;
            const base = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
            fetch(base)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { temp } = data.main;
                const place = data.name;
                const state = info[0].PostOffice[0].State;
                const country = info[0].PostOffice[0].Country;
                const { description, icon } = data.weather[0];
                const { sunrise, sunset } = data.sys;

                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                const fahrenheit = (temp * 9) / 5 + 32;

                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);

                iconImg.src = iconUrl;
                loc.textContent = `${place}, ${state}, ${country}`;
                desc.textContent = `${description}`;
                tempC.textContent = `${temp.toFixed(2)} °C`;
                tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
            });
            
        form.reset();
        input.focus();
        });
});