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


