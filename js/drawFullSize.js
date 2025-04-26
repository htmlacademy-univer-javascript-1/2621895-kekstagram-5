
import {createComments, generatePhotos} from './data.js';

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
    // Создаем комментарии и добавляем их в разметку
    const commentsData = createComments(5, usedIds); // Здесь функция получает 5 комментариев
    commentsData.forEach((comment) => {
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

    // Очищаем предыдущее описание
    socialCaption.textContent = '';


    // Преобразуем абсолютный путь изображения к относительному
    const imgSrc = img.src.split('/').pop(); // Получаем только имя файла фотографии (например, "1.jpg")

    const selectedPhoto = photosData.find((photo) => photo.url.endsWith(imgSrc)); // Находим выбранную фотографию, используя только имя файла

    // Добавляем описание для выбранной фотографии
    if (selectedPhoto) {
      socialCaption.textContent = selectedPhoto.description; // Устанавливаем описание для конкретной фотографии
    }

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
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
