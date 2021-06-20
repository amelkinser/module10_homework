// Задание 3.

// Реализовать чат на основе эхо - сервера wss://echo.websocket.org/
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
// Эхо - сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
// Добавить в чат механизм отправки гео - локации:
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.



// Создаётся контейнер для кнопок, поля ввода и поля вывода сообщений
const element = document.createElement("div"); element.classList.add("input-wrapper");
element.innerHTML += `
  <input type="text" name="input-message" id="input-message" placeholder="Здесь вводится текст сообщения">
`;
element.innerHTML += '<input type="button" class="btn-send" value="Отправить">';
element.innerHTML += '<input type="button" class="btn-geolocation" value="Гео-локация">';
element.innerHTML += '<br><div class="text-area"></div>';

document.querySelector(".container").appendChild(element);

document.querySelector("#input-message").focus(); // фокус на поле "Здесь вводится текст сообщения"

let btnSend = document.querySelector('.btn-send');
let btnGeolocation = document.querySelector('.btn-geolocation');
let textArea = document.querySelector(".text-area");

textArea.setAttribute('style', 'color: #664e96');


const wsUri = "wss://echo.websocket.org/";
let websocket;         // Экземпляр класса WebSocket
let geoLoc = 0;        // Признак успешного получения геолокации
let eventWebSocket = 0;  // Типы событий для прорисовки в textArea

// Выводим в textArea сообщения разных типов
function writeToScreen(message) {
  switch (eventWebSocket) {
    case 1:
    case 2:
      textArea.innerHTML += `<span class="service-message service-message--connect">${message}</span>`;
      break;
    case 3:
      textArea.innerHTML += `<span class="message message-from-server">${message}</span>`;
      break;
    case 4:
      textArea.innerHTML += `<span class="service-message service-message--err">${message}</span>`;
      break;
    case 5:
      textArea.innerHTML += `<span class="message message-to-server">${message}</span>`;
      break;
    case 6:
      textArea.innerHTML += `<a class="service-message service-message--geo" href=${message}>${message}</a>`;
      break;
    default:
      textArea.innerHTML += `<span class="service-message--default">${message}</span>`;
      break;
  }
  textArea.scrollTop = textArea.scrollHeight; // Это чтобы прокрутить полосу прокрутки div до последего элемента
  eventWebSocket = 0;
}

// Обработчик событий слежения за websocket-соединением
function workWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function (evt) {
    eventWebSocket = 1;
    writeToScreen("Соединение с сервером установлено");
  };
  websocket.onclose = function (evt) {
    eventWebSocket = 2;
    writeToScreen("Соединение прервано");
  };
  websocket.onmessage = function (evt) {
    if (geoLoc === 1) {
      geoLoc = 0;
      return;
    }
    eventWebSocket = 3;
    writeToScreen("Сообщение от сервера:<br>" + evt.data);
  };
  websocket.onerror = function (evt) {
    eventWebSocket = 4;
    writeToScreen("Ошибка: " + evt.data);
  };
}

// Подключаем обработчик событий слежения за websocket-соединением
window.addEventListener("load", workWebSocket, false);


// Обработчик кнопки "Отправить"
btnSend.addEventListener('click', (event) => {

  let message = document.querySelector('#input-message').value;
  geoLoc = 0;
  eventWebSocket = 5;
  writeToScreen("Сообщение от отправителя:<br>" + message);
  websocket.send(message);
})


// Функция, выводящая текст об ошибке
const error = () => {
  window.alert('Невозможно получить ваше местоположение');
}


// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let message = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  eventWebSocket = 6;
  writeToScreen(message);
  geoLoc = 1;
  websocket.send(message);
}

// Обработчик кнопки "Геолокация"
btnGeolocation.addEventListener('click', () => {

  if (!navigator.geolocation) {
    window.alert('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});


