
// phone block

const phoneInput = document.querySelector("#phone_input")
const phoneButton = document.querySelector("#phone_button")
const phoneResult = document.querySelector("#phone_result")

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK"
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = "ERROR"
        phoneResult.style.color = "red"
    }
}

// Tabs

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContentBlocks[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, index) => {
            if (event.target === tab) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }
}

let tabIndex = 0

const autoTabSlider = () => {
    setInterval(() => {
        tabIndex = (tabIndex + 1) % tabContentBlocks.length
        hideTabContent()
        showTabContent(tabIndex)
    }, 5000)
}

autoTabSlider()

// Card Switcher
const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let numId = 1
const maxId = 200

async function fetchAndDisplayCard(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        const data = await response.json()
        const { title, id: todoId, completed } = data
        cardBlock.innerHTML = `
            <p>${title}</p>
            <p>Completed: ${completed}</p>
            <span>ID: ${todoId}</span>
        `
    } catch (err) {
        cardBlock.innerHTML = `<p>Ошибка при загрузке</p>`
    }
}

fetchAndDisplayCard(numId)

btnNext.onclick = () => {
    numId = numId >= maxId ? 1 : numId + 1
    fetchAndDisplayCard(numId)
}

btnPrev.onclick = () => {
    numId = numId <= 1 ? maxId : numId - 1
    fetchAndDisplayCard(numId)
}

//  converter

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

somInput.oninput = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '../data/converter.json')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send()

    xhr.onload = () => {
        const VBR = JSON.parse(xhr.response)
        usdInput.value = (somInput.value / VBR.usd).toFixed(2)
    }
}

usdInput.oninput = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '../data/converter.json')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send()

    xhr.onload = () => {
        const VBR = JSON.parse(xhr.response)
        somInput.value = (usdInput.value * VBR.usd).toFixed(2)
    }
}

//  DRY- don't repeat yourself
// KISS - keep it simple, stupid!

const converter = (element) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            const data = JSON.parse(xhr.response);

            if (element.id === 'som') {
                usdInput.value = (element.value / data.usd).toFixed(2);
                eurInput.value = (element.value / data.eur).toFixed(2);
            }

            if (element.id === 'usd') {
                somInput.value = (element.value * data.usd).toFixed(2);
                eurInput.value = ((element.value * data.usd) / data.eur).toFixed(2);
            }

            if (element.id === 'eur') {
                somInput.value = (element.value * data.eur).toFixed(2);
                usdInput.value = ((element.value * data.eur) / data.usd).toFixed(2);
            }

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                eurInput.value = '';
            }
        };
    };
};

converter(somInput);
converter(usdInput);
converter(eurInput);

// // weather

const searchInput = document.querySelector('.cityName')
const searchButton = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

// с async/await + try/catch

const fetchCard = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) throw new Error('Ошибка запроса');
        const data = await response.json();
        const { title, completed } = data;

        cardBlock.innerHTML = `
            <p>${title}</p>
            <p>Completed: ${completed}</p>
            <span>ID: ${id}</span>
        `;
    } catch (error) {
        cardBlock.innerHTML = `<p>Ошибка загрузки карточки</p>`;
        console.error('Ошибка:', error);
    }
};

fetchCard(numId);

btnNext.onclick = () => {
    numId++;
    if (numId > maxId) numId = 1;
    fetchCard(numId);
};

btnPrev.onclick = () => {
    numId--;
    if (numId < 1) numId = maxId;
    fetchCard(numId);
};


// http://api.openweathermap.org/data/2.5/weather 
// Api key - e417df62e04d3b1b111abeab19cea714

const API = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

const searchWeather = async () => {
    if (searchInput.value==='') {
        city.innerHTML="Введите название города!"
    } else {
        try {
            const response = await fetch(`${API}?q=${searchInput.value}&appid=${API_KEY}&units=metric&lang=ru`)
            const data = await response.json()
            city.innerHTML = data.name || 'Город не найден'
            temp.innerHTML = data.main?.temp ? Math.round(data.main.temp)+'&deg;C' :''
            searchInput.value =''
        } catch (e) {
            console.log(e)
        }
       
    }
}

searchButton.onclick = () => searchWeather() 
window.onkeydown=(event) => {
    if (event.code === 'Enter') {
        searchWeather()
    }
}
// optional chaining 
// ?.

