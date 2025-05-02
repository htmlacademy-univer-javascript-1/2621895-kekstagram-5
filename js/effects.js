const imgUploadPreview = document.querySelector('.img-upload__preview'); //Предварительный просмотр изображения
const imgUploadPreviewImg = imgUploadPreview.querySelector('img'); //тег имг у предв просмотра
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');//контейнер эффекта
const effectLevelSlider = document.querySelector('.effect-level__slider');//слайдер
const effectsPreviewNone = document.querySelector('.effects__preview--none'); //none
const effectsPreviewChrome = document.querySelector('.effects__preview--chrome'); //chrome
const effectsPreviewSepia = document.querySelector('.effects__preview--sepia'); //sepia
const effectsPreviewMarvin = document.querySelector('.effects__preview--marvin'); //marvin
const effectsPreviewPhobos = document.querySelector('.effects__preview--phobos'); //phobos
const effectsPreviewHeat = document.querySelector('.effects__preview--heat'); //heat
const effectLevelValue = document.querySelector('.effect-level__value'); //значение для формы

//2.2. Наложение эффекта на изображение:
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1
  },
  start: [0],
  connect: 'lower',
  step: 0.1,
});

imgUploadEffectLevel.classList.add('hidden'); // Скрыть слайдер

function resetEffects() {
  imgUploadPreviewImg.style.filter = '';
  effectLevelSlider.noUiSlider.set(0);
}

//original
effectsPreviewNone.onclick = function(){
  resetEffects();
  imgUploadEffectLevel.classList.add('hidden'); // Скрыть слайдер
  effectLevelSlider.noUiSlider.on('update', () => {
    imgUploadPreviewImg.style.filter = '';
  });
};

//chrome
effectsPreviewChrome.onclick = function(){
  resetEffects();
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: [0],
    step: 0.1,
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    imgUploadPreviewImg.style.filter = `grayscale(${effectLevelSlider.noUiSlider.get()})`;
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
  });
};

//sepia
effectsPreviewSepia.onclick = function(){
  resetEffects();
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: [0],
    step: 0.1,
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    imgUploadPreviewImg.style.filter = `sepia(${effectLevelSlider.noUiSlider.get()})`;
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
  });
};

//marvin
effectsPreviewMarvin.onclick = function(){
  resetEffects();
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },
    start: [0],
    step: 1,
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    imgUploadPreviewImg.style.filter = `invert(${effectLevelSlider.noUiSlider.get()}%)`;
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
  });
};

//phobos
effectsPreviewPhobos.onclick = function() {
  resetEffects();
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3
    },
    start: [0],
    step: 0.1,
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    imgUploadPreviewImg.style.filter = `blur(${effectLevelSlider.noUiSlider.get()}px)`;
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
  });
};

//heat
effectsPreviewHeat.onclick = function() {
  resetEffects();
  imgUploadEffectLevel.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: [1],
    step: 0.1,
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    imgUploadPreviewImg.style.filter = `brightness(${effectLevelSlider.noUiSlider.get()})`;
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
  });
};
