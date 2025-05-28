const bigPicture = document.querySelector('.big-picture'); // Контейнер для картинок
const bigPictureImageDiv = document.querySelector('.big-picture__img'); //  картинка
const bigPictureImage = bigPictureImageDiv.querySelector('img');
const likes = document.querySelector('.likes-count'); //лайкт
const comments = document.querySelector('.comments-count'); //комменты
const socialComments = document.querySelector('.social__comments'); //Список комментариев
const socialCaption = document.querySelector('.social__caption'); //Описание
const socialCommentCount = document.querySelector('.social__comment-count'); //блок счётчика комментариев
const commentsLoader = document.querySelector('.comments-loader'); //блок загрузки новых комментариев
const htmlBody = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

// Добавляем переменные для работы с комментариями:
let allComments = []; // Здесь будут все сгенерированные комментарии для текущего изображения
let renderedCommentsCount = 0; // Сколько комментариев уже отрисовали

// Здесь используем множество для хранения уникальных ID комментариев
const usedIds = new Set();

// Функция для открытия большой фотографии
function openBigPicture(photo) {
  bigPicture.classList.remove('hidden'); // Показываем большой контейнер
  bigPictureImage.src = photo.url; // Устанавливаем src большого изображения
  bigPictureImage.alt = photo.description; // Устанавливаем alt большого изображения
  likes.textContent = photo.likes; // Устанавливаем лайки
  comments.textContent = photo.comments.length; // Устанавливаем комменты

  // Очищаем предыдущие комментарии
  socialComments.innerHTML = '';
  // Очищаем множество ID, чтобы не было конфликтов между разными картинками
  usedIds.clear();

  // ГЕНЕРИРУЕМ КОММЕНТАРИИ:
  // Случайно определяем количество комментариев (от 5 до 25)
  // И создаём массив объектов-комментариев с уникальными id
  allComments = photo.comments;

  // Сбрасываем счётчик уже отрисованных комментариев
  renderedCommentsCount = 0;

  // Показываем блок счётчика комментариев и кнопку загрузки новых
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Функция отрисовки порции комментариев (по 5 штук за раз)
  function renderCommentsPortion() {
    const COMMENTS_PORTION = 5; // Количество комментариев за одну подгрузку

    // Выбираем часть комментариев из массива, которые надо отобразить
    const commentsToRender = allComments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PORTION);

    // Для каждого комментария создаём DOM-элемент <li>
    commentsToRender.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');
      // Вставляем разметку комментария: аватар, имя и текст сообщения
      commentElement.innerHTML = `
        <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;
      // Добавляем комментарий в список
      socialComments.appendChild(commentElement);
    });
    // Обновляем количество уже отрисованных комментариев
    renderedCommentsCount += commentsToRender.length;

    // Меняем текст в блоке счётчика комментариев
    socialCommentCount.textContent = `${renderedCommentsCount} из ${allComments.length} комментариев`;

    // Если все комментарии уже показаны — скрываем кнопку загрузки новых
    if (renderedCommentsCount >= allComments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  // Отрисовываем первую порцию комментариев сразу при открытии изображения
  renderCommentsPortion();

  // Устанавливаем описание для конкретной фотографии
  socialCaption.textContent = photo.description;

  // Отключаем прокрутку под модальным окном
  htmlBody.classList.add('modal-open');

  // Обработчик на кнопку "загрузить ещё" комментарии
  commentsLoader.onclick = () => {
    const COMMENTS_PORTION = 5; // Количество комментариев за раз
    const commentsToRender = allComments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PORTION);

    commentsToRender.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');
      commentElement.innerHTML = `
        <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;
      socialComments.appendChild(commentElement);
    });

    renderedCommentsCount += commentsToRender.length;
    socialCommentCount.textContent = `${renderedCommentsCount} из ${allComments.length} комментариев`;

    if (renderedCommentsCount >= allComments.length) {
      commentsLoader.classList.add('hidden');
    }
  };
}

// Закрытие большого изображения по кнопке
bigPictureCancel.addEventListener('click', () => {
  htmlBody.classList.remove('modal-open'); // Возвращаем прокрутку
  bigPicture.classList.add('hidden'); // Скрываем окно
});

// Закрытие по Escape
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    htmlBody.classList.remove('modal-open'); // Возвращаем прокрутку
    bigPicture.classList.add('hidden'); // Скрываем окно
  }
});


export { openBigPicture };
