import {renderPictures} from './module.js'; // отрисовка миниатюр
import {shuffleArray, debounce} from './util.js'; // вспомогательные функции

const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

// Очищает блок с изображениями перед отрисовкой новых
function clearPictures() {
  const pictureContainer = document.querySelector('.pictures'); // контейнер с фото
  const pictures = pictureContainer.querySelectorAll('.picture'); // находим все элементы с классом picture
  pictures.forEach((picture) => picture.remove()); // удаляем каждую найденную картинку
}

// Находим контейнер с кнопками фильтрации
const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');

// Функция для отображения блока фильтров после загрузки фотографий
export function showFilters() {
  imgFilters.classList.remove('img-filters--inactive');
}


// Главная функция фильтрации изображений
export function initFilters(photos) {
  let currentFilter = FILTER_DEFAULT;

  // Функция применения фильтра
  const applyFilter = (filter) => {
    let filteredPhotos = [];

    switch (filter) {
      case FILTER_RANDOM:
        // 10 случайных, неповторяющихся фотографий
        filteredPhotos = shuffleArray(photos).slice(0, 10);
        break;

      case FILTER_DISCUSSED:
        // Сортировка по убыванию количества комментариев
        filteredPhotos = [...photos].sort((a, b) => b.comments.length - a.comments.length);
        break;

      default:
        // По умолчанию — как пришли с сервера
        filteredPhotos = photos;
        break;
    }
    //очистка
    clearPictures();
    // Отрисовываем отфильтрованные миниатюры
    renderPictures(filteredPhotos);
  };

  // Debounce-обертка для применения фильтра
  const debouncedApplyFilter = debounce(applyFilter, 500);

  // Обработчик клика по фильтрам
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const selectedFilter = evt.target.id;

      // Если выбран тот же фильтр — ничего не делаем
      if (currentFilter === selectedFilter) {
        return;
      }

      // Меняем активную кнопку
      filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');

      // Обновляем текущий фильтр
      currentFilter = selectedFilter;

      // Применяем новый фильтр с debounce
      debouncedApplyFilter(selectedFilter);
    });
  });
}
