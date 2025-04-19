function stringLength(str, maxLenght){
  return str.length <= maxLenght;
}

stringLength('проверяемая строка', 20);
stringLength('проверяемая строка', 18);
stringLength('проверяемая строка', 10);


function palindrome(str){
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
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
    const num = parseInt(row[i], 10);
    if (!isNaN(num)) {
      newStr += row[i];
    }
  }

  return newStr.length > 0 ? parseInt(newStr, 10) : NaN;
}

numbersInRow('2023 year');
numbersInRow('ECMAScript 2022');
numbersInRow(2023);
numbersInRow(-1);
numbersInRow(1.5);


// 5.16. Функции возвращаются

function workDay(start, end, startMeeting, durationMeeting) {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const [meetHour, meetMinute] = startMeeting.split(':').map(Number);

  const totalMeetingMinutes = meetHour * 60 + meetMinute + durationMeeting;
  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;

  return meetHour * 60 + meetMinute >= totalStartMinutes && totalMeetingMinutes <= totalEndMinutes;
}

workDay('08:00', '17:30', '14:00', 90);
// console.log(workDay('08:00', '17:30', '14:00', 90)); // true
// console.log(workDay('8:0', '10:0', '8:0', 120));     // true
// console.log(workDay('08:00', '14:30', '14:00', 90)); // false
// console.log(workDay('14:00', '17:30', '08:0', 90));  // false
// console.log(workDay('8:00', '17:30', '08:00', 900)); // false
