// Задание 1.

// Сверстайте кнопку, которая будет содержать в себе icon_01(как в примере в последнем видео).При клике на кнопку иконка должна меняться на icon_02.Повторный клик меняет иконку обратно.

icon01 = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
</svg>`;

icon02 = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
</svg>`;


const btn = document.querySelector('.btn-svg'); // кнопка

const btnIcon = document.querySelector('.btn__icon'); // контейнер иконки в кнопке

btnIcon.innerHTML = icon01; // в кнопку помещаем первую иконку


let Tag = 0;

// Обработчик кнопки -> переключает иконки по нажатию
btn.addEventListener('click', () => {

  if (Tag == 0) {
    btnIcon.innerHTML = icon02;
    Tag = 1;
  }
  else {
    btnIcon.innerHTML = icon01;
    Tag = 0;
  }

});


