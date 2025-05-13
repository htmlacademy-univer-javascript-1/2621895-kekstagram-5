const imgUploadOverlay = document.querySelector('.img-upload__overlay'); //Форма редактирования изображения
const imgUploadCancel = document.querySelector('.img-upload__cancel'); //Кнопка закрытия редактора фото
const imgUploadInput = document.querySelector('.img-upload__input'); //инпут загрузки изображения
const body = document.querySelector('body');
const imgUploadPreview = document.querySelector('.img-upload__preview'); //Предварительный просмотр изображения
const imgUploadPreviewImg = imgUploadPreview.querySelector('img'); //тег имг у предв просмотра


//обработчик инпута загрузки изображения
imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0]; //Здесь у нас только один файл, поэтому мы берём input.files[0]
  if (file) {
    const reader = new FileReader(); // Создаем объект FileReader

    // Обработчик события загрузки файла
    reader.onload = (event) => {
      body.classList.add('modal-open');
      imgUploadOverlay.classList.remove('hidden');
      imgUploadPreviewImg.src = event.target.result; // Устанавливаем src тега img
    };

    reader.readAsDataURL(file); // Читаем файл как Data URL
  }
});


//обработчики кнопки закрытия редактирования изображения
imgUploadCancel.addEventListener('click', () =>{
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
});
document.addEventListener('keydown', (evt) =>{
  if (evt.key === 'Escape'){
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});


//Функция для показа сообщения об успешной отправке
const showSuccessMessage = () => {
  // Находим шаблон успешной отправки и клонируем его
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  // Функция для удаления сообщения
  const removeMessage = () => {
    successMessage.remove();
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onEscKeyDown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onClickOutside);
  };

  // Закрытие по Escape
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      removeMessage();
    }
  };

  // Закрытие по клику вне сообщения
  const onClickOutside = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeMessage();
    }
  };

  // Закрытие по кнопке
  successMessage.querySelector('.success__button').addEventListener('click', removeMessage);

  // Вешаем обработчики
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);
};


//Функция для показа сообщения об ошибке
const showErrorMessage = () => {
  // Находим шаблон ошибки и клонируем его
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);

  // Функция для удаления сообщения
  const removeMessage = () => {
    errorMessage.remove();
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onEscKeyDown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onClickOutside);
  };

  // Закрытие по Escape
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      removeMessage();
    }
  };

  // Закрытие по клику вне сообщения
  const onClickOutside = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeMessage();
    }
  };

  // Закрытие по кнопке
  errorMessage.querySelector('.error__button').addEventListener('click', removeMessage);

  // Вешаем обработчики
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);
};

export { showSuccessMessage, showErrorMessage };
