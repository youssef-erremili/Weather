// declare all variable and html tags that I need 
const cityName = document.getElementById("cityName")
const cityTemp = document.querySelectorAll(".cityTemp")
const cityWind = document.getElementById("cityWind")
const cityHumidity = document.getElementById("cityHumidity")
const searchField = document.getElementById("search")
const searchBtn = document.getElementById("searchBtn")
const weatherCondition = document.getElementById("weatherCondition")
const weatherImg = document.getElementById("weatherImg")
const weatherDescription = document.getElementById("weatherDescription")
const countryName = document.getElementById("countryName")
const weatherDate = document.getElementById("weatherDate")
const learnSection = document.getElementById("learn")
const Doctoogle = document.querySelector(".toogle")
const DoctRemove = document.querySelector(".remove")
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weatherTime = new Date()
const apiKey = "5cd4645f9ab917a3ac725579e5f8ada8"
const weatherApi = "https://api.openweathermap.org/data/2.5/weather?units=metric"



// update time  deponds on local time
weatherDate.innerHTML = `${monthNames[weatherTime.getMonth()]} ${weatherTime.getDate()}, ${weatherTime.getFullYear()}`


// I use fetch method to call the api weather 
function checkWeather(city) {
    fetch(weatherApi + `&q=${city}` + `&appid=${apiKey}`)
        .then(response => response.json())
        .then(weatherData =>
            weatherFunction(weatherData)
        )
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "there is no city with that name" + ` "${city}"`
            }),
                console.error("something went wrong", error)
        })
}


// this function is run search field
searchBtn.addEventListener("click", function (e) {
    if (searchField.value.trim() !== "") {
        e.preventDefault()
        checkWeather(searchField.value)
        searchField.value = ""
    } else if (searchField.value.trim() === "") {
        Swal.fire({
            title: "Oops?",
            text: "fill the input search!",
            icon: "question"
        });
    }
})


// and this funtion is about to set every data in its place in HTML 
function weatherFunction(weatherinfo) {
    cityName.innerHTML = `${weatherinfo.name}, `
    countryName.innerHTML = weatherinfo.sys.country
    cityTemp.forEach((temp) => {
        temp.innerHTML = Math.round(weatherinfo.main.temp)
    })
    cityWind.innerHTML = weatherinfo.wind.speed
    cityHumidity.innerHTML = weatherinfo.main.humidity
    weatherCondition.innerHTML = weatherinfo.weather[0].main
    weatherDescription.innerHTML = weatherinfo.weather[0].description
    if (weatherinfo.weather[0].main === "Clear") {
        weatherImg.setAttribute("src", "img/clear.png")
    }
    else if (weatherinfo.weather[0].main === "Clouds") {
        weatherImg.setAttribute("src", "img/clouds.png")
    }
    else if (weatherinfo.weather[0].main === "Rain") {
        weatherImg.setAttribute("src", "img/rain.png")
    }
    else if (weatherinfo.weather[0].main === "Drizzle") {
        weatherImg.setAttribute("src", "img/drizzle.png")
    }
    else if (weatherinfo.weather[0].main === "Snow") {
        weatherImg.setAttribute("src", "img/snow.png")
    }
    else if (weatherinfo.weather[0].main === "Mist") {
        weatherImg.setAttribute("src", "img/mist.png")
    }
}

// this function is to show documentation
learnSection.addEventListener("click", () => {
    Doctoogle.classList.add("hideDoc")
})
DoctRemove.addEventListener("click", () => {
    Doctoogle.classList.remove("hideDoc")
})
