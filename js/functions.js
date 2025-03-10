function stringLength(str, maxLenght){
  return str.length <= maxLenght;
}

stringLength('проверяемая строка', 20);
stringLength('проверяемая строка', 18);
stringLength('проверяемая строка', 10);


function palindrome(str){
  let normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let newStr = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    newStr += normalizedStr[i];
  }
  return(normalizedStr === newStr);
}

palindrome('topot');


function numbersInRow(row){
  if (typeof row === 'number') {
    row = row.toString();
  } else if (typeof row !== 'string') {
    return NaN;
  }

  let newStr = '';

  for (let i = 0; i < row.length; i++){
    let num = parseInt(row[i]);
    if (!isNaN(num)) {
      newStr += row[i];
    }
  }

  return newStr.length > 0 ? parseInt(newStr) : NaN;
}

numbersInRow('2023 year');
numbersInRow('ECMAScript 2022');
numbersInRow(2023);
numbersInRow(-1);
numbersInRow(1.5);


