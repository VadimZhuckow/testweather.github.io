let city = document.querySelector(".city"); // блок для вывода города
let weather = document.querySelector(".weather");
let pogoda = document.querySelector(".pogoda");
let wind = document.querySelector(".wind_speed");

let x = 0;
let y = 0;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
// при согласие пользовтаеля дать геоданные, выполняется эта функция
async function ip() {
  // функция получения ip
  let c = 0;
  let res = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_Hw9HqpTOjpkwOCGmpkYCO3KKYHXUt`
  )
    .then((city) => city.json())
    .then((city) => (c = city.location.region)); // получаем город, который мы должны использовать для получении температуры
  city.textContent = c;

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${c},RU&appid=51d1d0a1921b759daf26dad3f5f28daa&units=metric`
  )
    .then((data) => data.json())
    .then((data) => console.log(data.main.temp));
}

function success(pos) {
  var crd = pos.coords;

  let x = crd.latitude;
  let y = crd.longitude;
  console.log(`Широта: ${x}`);
  console.log(`Долгота: ${y}`);
  ip();
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&exclude={part}&appid=51d1d0a1921b759daf26dad3f5f28daa&units=metric`
  )
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      weather.textContent = "Погода в городе:" + " " + data.current.temp + "c";
      pogoda.textContent =
        "Погодные условия:" + " " + data.current.weather[0].main;
      wind.textContent =
        "Скорость ветра:" + " " + data.current.wind_speed + "м/с";
    });
}

// если пользователь не дает свое согласие то следуем тому скрипту который ниже
function error(err) {
  console.warn("пользователь не дал сове согласие");
  // получение ip при запрете
}

navigator.geolocation.getCurrentPosition(success, error, options);
