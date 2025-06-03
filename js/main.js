import { setUserFormSubmit } from './editing.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');

//обработчик отправки формы
function closeUserModal () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset(); // Сбрасываем форму
}
setUserFormSubmit(closeUserModal);


// Обработчик для открытия формы
imgUploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});
