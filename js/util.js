// Функция для получения случайного целого числа в заданном диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для выбора случайного элемента из массива
function getRandomElement(arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
}

export {getRandomInteger, getRandomElement};
