import { generatePhotos } from './data.js';

// Модуль для отрисовки миниатюр
(function () {
  const picturesContainer = document.querySelector('.pictures'); // Контейнер для картинок
  const pictureTemplate = document.querySelector('#picture'); // Шаблон картинки

  // Генерируем данные для фотографий
  const photosData = generatePhotos();

  // Функция для создания элемента фотографии
  function createPictureElement(data) {
    const pictureElement = pictureTemplate.content.cloneNode(true); // Клонируем содержимое шаблона

    const img = pictureElement.querySelector('.picture__img');
    img.src = data.url; // Устанавливаем URL изображения
    img.alt = data.description; // Устанавливаем описание изображения

    const comments = pictureElement.querySelector('.picture__comments');
    comments.textContent = data.comments.length; // Устанавливаем количество комментариев

    const likes = pictureElement.querySelector('.picture__likes');
    likes.textContent = data.likes; // Устанавливаем количество лайков

    return pictureElement;
  }

  // Функция для отрисовки всех фотографий
  function renderPictures(pictures) {
    const fragment = document.createDocumentFragment(); // Создаем документ фрагмент для быстрого добавления

    pictures.forEach((picture) => {
      const pictureElement = createPictureElement(picture);
      fragment.appendChild(pictureElement); // Добавляем элемент в фрагмент
    });

    picturesContainer.appendChild(fragment); // Вставляем фрагмент в контейнер
  }

  // Отрисовываем фотографии
  renderPictures(photosData);
})();
