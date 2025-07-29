// phone block

const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button")
const gmailResult = document.querySelector("#gmail_result")

const regExp = /^[a-zA-Z0-9._%+-]{3,}@gmail\.com$/;

gmailButton.onclick =() => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML ="OK"
        gmailResult.style.color='green'
    }
        else {
            gmailResult.innerHTML ="ERROR"
            gmailResult.style.color="red"
        }
}


//animation block
// let number = 0;
// const block = document.querySelector('.child_block');
// const parentBlock = document.querySelector('.parent_block')

const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let positionX = 0;
let positionY = 0;
let direction = 'right';

const offsetWidth = parentBlock.clientWidth - childBlock.clientWidth;
const offsetHeight = parentBlock.clientHeight - childBlock.clientHeight;

const moveBlock = () => {
    if (direction === 'right') {
        if (positionX < offsetWidth) {
            positionX++;
        } else {
            direction = 'down';
        }
    } else if (direction === 'down') {
        if (positionY < offsetHeight) {
            positionY++;
        } else {
            direction = 'left';
        }
    } else if (direction === 'left') {
        if (positionX > 0) {
            positionX--;
        } else {
            direction = 'up';
        }
    } else if (direction === 'up') {
        if (positionY > 0) {
            positionY--;
        } else {
            direction = 'right';
        }
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    requestAnimationFrame(moveBlock);
};

moveBlock();

// const count = () => {
//     number++;
//     block.style.left = number + "px";

//     if (number < 447) {
//         requestAnimationFrame(count); 
//     }
// };

//  window.onload = () => {
//       count();
//  }


// let number=0
// const count = () => {
//     number++
//     console.log(number)
//     if (number < 450) {
//         count
//     }
// }

//ДЗ 2

const secondsBlock = document.querySelector('#seconds')
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const resetBtn = document.querySelector('#reset')

let seconds = 0
let interval = null

startBtn.onclick = () => {
    if ( interval !== null ) return
    interval = setInterval ( () => {
        seconds++
        secondsBlock.innerText = seconds
    }, 1000)
}

stopBtn.onclick = () => {
    clearInterval(interval)
    interval = null
}

resetBtn.onclick = () => {
    clearInterval(interval)
    seconds=0
    secondsBlock.innerText=seconds
    interval=null
}

//characters
const charact = document.querySelector('.characters-list');

charact.onclick = function() {
    // Если уже загрузили данные, чтобы не дублировать
    if (charact.dataset.loaded === 'true') return;

    // Показать индикатор загрузки
    charact.innerHTML = '<p>Загрузка...</p>';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/character.json');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);

            // Очистить контейнер
            charact.innerHTML = '';

            data.forEach(function(item) {
                const block = document.createElement('div');
                block.className = 'character-card';

                block.innerHTML = `
                    <div class="character-photo">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <h3>${item.name}</h3>
                    <p>Age: ${item.age}</p>
                    ${item.titanName ? `<p>Titan: ${item.titanName}</p>` : ''}
                    ${item.oneWord ? `<p>Trait: ${item.oneWord}</p>` : ''}
                `;

                charact.appendChild(block);
            });

            // Помечаем, что данные уже загружены
            charact.dataset.loaded = 'true';
        } else {
            charact.innerHTML = '<p>Ошибка загрузки данных</p>';
        }
    };

    xhr.onerror = function() {
        charact.innerHTML = '<p>Ошибка сети</p>';
    };
};


//any json
const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/any.json');
xhr.send();

xhr.onload = function() {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
};

