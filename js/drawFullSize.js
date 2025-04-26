import {createComments, generatePhotos} from './data.js';
import {getRandomInteger} from './util.js';

const bigPicture = document.querySelector('.big-picture'); // Контейнер для картинок
const bigPictureImageDiv = document.querySelector('.big-picture__img'); //  картинка
const bigPictureImage = bigPictureImageDiv.querySelector('img');
const pictures = document.querySelectorAll('.picture'); //  мал. картинки
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
// Генерация фотографий
const photosData = generatePhotos();

pictures.forEach((picture) => {
  picture.addEventListener('click', () => {
    const img = picture.querySelector('img'); // Получаем img внутри текущей картинки
    bigPicture.classList.remove('hidden'); // Показываем большой контейнер
    bigPictureImage.src = img.src; // Устанавливаем src большого изображения
    bigPictureImage.alt = img.alt; // Устанавливаем alt большого изображения
    likes.textContent = picture.querySelector('.picture__likes').textContent ; // Устанавливаем лайки
    comments.textContent = picture.querySelector('.picture__comments').textContent ; // Устанавливаем комменты

    // Очищаем предыдущие комментарии
    socialComments.innerHTML = '';
    // Очищаем множество ID, чтобы не было конфликтов между разными картинками
    usedIds.clear();

    // ГЕНЕРИРУЕМ КОММЕНТАРИИ:
    // Случайно определяем количество комментариев (от 5 до 25)
    // И создаём массив объектов-комментариев с уникальными id
    allComments = createComments(getRandomInteger(5, 25), usedIds);

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
    // Очищаем предыдущее описание
    socialCaption.textContent = '';


    // Преобразуем абсолютный путь изображения к относительному
    const imgSrc = img.src.split('/').pop(); // Получаем только имя файла фотографии

    const selectedPhoto = photosData.find((photo) => photo.url.endsWith(imgSrc)); // Находим выбранную фотографию, используя только имя файла

    // Добавляем описание для выбранной фотографии
    if (selectedPhoto) {
      socialCaption.textContent = selectedPhoto.description; // Устанавливаем описание для конкретной фотографии
    }

    htmlBody.classList.add('modal-open'); //чтобы не было прокрутки
  });
});

bigPictureCancel.addEventListener('click', () => {
  htmlBody.classList.remove('modal-open'); //возвращаем прокрутку
  bigPicture.classList.add('hidden'); //скрываем окно
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape'){
    htmlBody.classList.remove('modal-open'); //возвращаем прокрутку
    bigPicture.classList.add('hidden'); //скрываем окно
  }
});


//блок комментариев
// Обработчик на кнопку "загрузить ещё" комментарии
commentsLoader.addEventListener('click', () => {
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
});
