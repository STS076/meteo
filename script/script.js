function frenchDate(longDate) { 
    let arrayMonths = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    let arrayDate = longDate.split(' ')[0].split('-') 
    return arrayDate[2] + ' ' + arrayMonths[+arrayDate[1] - 1] + ' ' + arrayDate[0] 
}

function frenchHour(longDate) { 
    let arrayHour = longDate.split(' ')[1].split(':') 
    return arrayHour[0] + 'h00' 
}


function createForecast(data, totalPreview) {

    let mainForecast = document.getElementById('mainForecast')
    mainForecast.insertAdjacentHTML('beforeend', `
        <h1 class="city">${data.city.name}</h1>
        <p class="main-date">${frenchDate(data.list[0].dt_txt)}</p>
        <div class="forecast col-lg-4 py-3 shadow rounded-3">
            <p class="main-hour mb-0">${frenchHour(data.list[0].dt_txt)}</p>
            <img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="${data.list[0].weather[0].description}">
            <p class="main-temp mb-0">${data.list[0].main.temp}°C</p>
            <p class=" mb-0"><i class="bi bi-wind"></i> ${data['list'][0]['wind']['speed']} km/h </p>
        </div>
    `)

    let multiForecast = document.getElementById('multiForecast')
    for (let i = 1; i <= totalPreview; i++) {
        multiForecast.insertAdjacentHTML('beforeend', `
        <div class="forecast col-lg-2 p-2 text-center rounded-3 shadow">
            <p class="fs-6 mb-0 mt-1">${frenchDate(data.list[i].dt_txt)}</p>
            <p class="fs-5 mb-0">${frenchHour(data.list[i].dt_txt)}</p>
            <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="${data.list[i].weather[0].description}">
            <p class=" mb-0">${data.list[i].weather[0].description}</p>
            <p class=" fw-bold">${data.list[i].main.temp}°C</p>
            <p class=" mb-0"><i class="bi bi-wind"></i> ${data['list'][0]['wind']['speed']} km/h </p>
        </div>
    `)
    }

    let tableForecast = document.getElementById('tableForecast')
    for (let i = 1; i <= totalPreview; i++) {
        tableForecast.insertAdjacentHTML('beforeend', `
        <tr class="align-middle pt-5 text-dark ">
            <td>${frenchHour(data.list[i].dt_txt)}</td>
            <td>${data.list[i].weather[0].description}</td>
            <td><img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt="${data.list[i].weather[0].description}"></td>
            <td>${data.list[i].main.temp}°C</td>
            <td class=" mb-0"><i class="bi bi-wind"></i> ${data['list'][0]['wind']['speed']} km/h </td>
        </tr>
        `)
    }
}


function displayMeteo(id) {
    let cityId = id
    let apiKey = '1ae8433d96c081474e7e3bae06a34991' 
    let lang = 'fr'
    let metric = 'metric'

    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&lang=${lang}&units=${metric}`)
        .then(reponse => reponse.json())
        .then(data => {

            createForecast(data, 5)
        })
}


// 6456451 = Le Havre
//  2643743 = Londres
//  5391811 = San Diego

// displayMeteo(6456451)

function showForecast(id) {
    let landingPage = document.getElementById('landingPage')
    let favoris = document.getElementById('favoris')
    let mainForecast = document.getElementById('mainForecast')
    mainForecast.innerHTML = ''
    let multiForecast = document.getElementById('multiForecast')
    multiForecast.innerHTML = ''
    let tableForecast = document.getElementById('tableForecast')
    tableForecast.innerHTML = ''
    landingPage.style.display = 'none'
    favoris.style.display = 'block'
    displayMeteo(id)

}

function retourMaison() {
    let favoris = document.getElementById('favoris')
    let landingPage = document.getElementById('landingPage')
    landingPage.style.display = 'block'
    favoris.style.display = 'none'

}


