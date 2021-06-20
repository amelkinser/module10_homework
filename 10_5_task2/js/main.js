// Задание 2.
// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.

// Создаётся контейнер для кнопки
const element = document.createElement("div");
element.classList.add("input-wrapper");

element.innerHTML += '<input type="button" class="btn-request" value="Запрос">';

document.querySelector('.container').appendChild(element);

const btnNode = document.querySelector('.btn-request');

// Обработчик кнопки "Запрос"
btnNode.addEventListener('click', (event) => {

  let msg = `
Ширина экрана: ${window.screen.width} * ${window.screen.height}
Размер окна браузера:
    - с учётом полосы прокрутки: ${window.innerWidth} * ${window.innerHeight}
    - без учёта полосы прокрутки: ${document.documentElement.clientWidth} * ${document.documentElement.clientHeight}
`;

  window.alert(msg);
});