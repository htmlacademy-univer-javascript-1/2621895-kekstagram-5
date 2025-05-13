// import { pristine } from './editing.js';
// const imgUploadForm = document.querySelector('.img-upload__form');

// Загрузка данных с сервера и отрисовка фотографий
export function loadPhotos() {
  return fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить фотографии');
      }
      return response.json();
    });
}
