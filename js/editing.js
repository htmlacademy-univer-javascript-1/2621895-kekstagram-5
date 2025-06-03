// Обработчик отправки формы
import { showSuccessMessage, showErrorMessage } from './upload.js';
import { resetEffects } from './effects.js';
const imgUploadPreview = document.querySelector('.img-upload__preview'); //Предварительный просмотр изображения
const imgUploadPreviewImg = imgUploadPreview.querySelector('img'); //тег имг у предв просмотра
const scaleControl = document.querySelector('.scale__control--value'); //ползунок размера изображения
let scaleControlValue = parseInt(scaleControl.value, 10); //значение ползунка размера изображения
const scaleControlSmaller = document.querySelector('.scale__control--smaller'); //-
const scaleControlBigger = document.querySelector('.scale__control--bigger'); //+
const imgUploadForm = document.querySelector('.img-upload__form'); //вся форма загрузки
const textHashtags = document.querySelector('.text__hashtags'); //поле хештега
const textDescription = document.querySelector('.text__description');
const imgUploadInput = document.querySelector('.img-upload__input'); //инпут загрузки изображения

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

//2.3. Хэш-теги:
// Валидация хэш-тегов
const validateHashtags = (value) => {
  if (value === ''){
    return true;
  } // хэш-теги необязательны

  const hashtags = value.trim().split(/\s+/);

  // Проверка на максимальное количество хэш-тегов
  if (hashtags.length > MAX_HASHTAGS_COUNT){
    return false;
  }

  // Проверка каждого хэш-тега
  for (const tag of hashtags){
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(tag)) {
      return false;
    }
  }

  // Проверка на повторяющиеся хэш-теги (без учета регистра)
  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseTags).size !== hashtags.length){
    return false;
  }

  return true;
};

// Сообщения об ошибках для хэш-тегов
const getHashtagErrorMessage = (value) => {
  if (value === ''){
    return '';
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS_COUNT){
    return 'Нельзя указать больше пяти хэш-тегов';
  }

  for (const tag of hashtags){
    if (!/^#/.test(tag)) {
      return 'Хэш-тег должен начинаться с символа #';
    }
    if (tag === '#'){
      return 'Хэш-тег не может состоять только из решётки';
    }
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(tag)){
      return 'Недопустимые символы в хэш-теге или превышена длина';
    }
  }

  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseTags).size !== hashtags.length){
    return 'Хэш-теги не должны повторяться';
  }

  return '';
};

// Валидация комментария
const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

// Создаем экземпляр Pristine
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Добавляем валидаторы
pristine.addValidator(
  textHashtags,
  validateHashtags,
  getHashtagErrorMessage
);

pristine.addValidator(
  textDescription,
  validateDescription,
  'Длина комментария не может превышать 140 символов'
);

//функция сброса формы
function resetFrom(){
  scaleControl.value = `${MAX_SCALE_VALUE}%`;
  imgUploadPreviewImg.style.transform = 'scale(1)'; // Сбросим трансформацию
  imgUploadPreviewImg.style.filter = 'none'; // Уберем все фильтры
  imgUploadInput.value = ''; // Очистим инпут файла
  pristine.reset(); // Сбросим валидацию
  resetEffects();
}

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = imgUploadForm.querySelector('.img-upload__submit');
    submitButton.disabled = true;

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            onSuccess(); // Закрытие формы
            showSuccessMessage(); // Показ сообщения об успехе
            resetFrom();
          } else {
            showErrorMessage(); // Показ сообщения об ошибке
          }
        })
        .catch(() => {
          showErrorMessage(); // Показ сообщения об ошибке, если запрос упал
        })
        .finally(() => {
          submitButton.disabled = false; // Разблокировка кнопки
        });
    } else {
      submitButton.disabled = false; // Разблокировка кнопки, если валидация не прошла
    }
  });
};

export {setUserFormSubmit};

// Предотвращаем закрытие формы при нажатии Esc в полях ввода
textHashtags.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});


//2.1. Масштаб:
// Обработчик для уменьшения значения
scaleControlSmaller.addEventListener('click', () => {
  if (scaleControlValue > MIN_SCALE_VALUE) {
    scaleControlValue -= SCALE_STEP;
    scaleControl.value = `${scaleControlValue}%`;
    imgUploadPreviewImg.style.transform = `scale(${scaleControl.value})`;
  }
});

// Обработчик для увеличения значения
scaleControlBigger.addEventListener('click', () => {
  if (scaleControlValue < MAX_SCALE_VALUE) {
    scaleControlValue += SCALE_STEP;
    scaleControl.value = `${scaleControlValue}%`;
    imgUploadPreviewImg.style.transform = `scale(${scaleControl.value})`;
  }
});

export {pristine};

