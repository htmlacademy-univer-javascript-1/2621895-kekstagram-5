import {getRandomInteger, getRandomElement} from'./util.js';
// Функция для создания случайных комментариев
function createComments(count, usedIds) {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const names = ['Артём', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Елена', 'Алексей', 'Татьяна'];
  const comments = [];

  for (let i = 0; i < count; i++) {
    let id = getRandomInteger(1, 1000);
    while (usedIds.has(id)) { //содержится ли указанное значение (id) в множестве usedIds
      id = getRandomInteger(1, 1000); // Повторная генерация, если ID уже существует
    }
    usedIds.add(id);

    comments.push({
      id,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`, // Случайный аватар от 1 до 6
      message: getRandomElement(messages), // Случайное сообщение из списка
      name: getRandomElement(names) // Случайное имя из списка
    });
  }
  return comments;
}

// Функция для генерации массива фотографий
function generatePhotos() {
  const usedIds = new Set(); // Хранилище уникальных ID комментариев
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`, // Формирование уникального URL изображения
      description: `Описание фотографии #${i}`, // Описание с номером фотографии
      likes: getRandomInteger(15, 200), // Случайное количество лайков от 15 до 200
      comments: createComments(getRandomInteger(0, 30), usedIds) // Генерация случайного числа комментариев
    });
  }

  return photos;
}

export {createComments, generatePhotos};
