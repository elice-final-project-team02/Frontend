import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export function changeDateToHHMM(date) {
  return dayjs(date).format('HH:mm');
}

export function changeDateToMonthAndDateAndDayOfTheWeek(date) {
  return dayjs(date).format('MM/DD(dd)');
}
export function changeDateToMonthAndDate(date) {
  return dayjs(date).format('MM/DD');
}

/** 월 => 0 */
export function changeKoreaDayOfWeekToNumber(day) {
  switch (day) {
    case '월':
      return 0;
    case '화':
      return 1;
    case '수':
      return 2;
    case '목':
      return 3;
    case '금':
      return 4;
    case '토':
      return 5;
    case '일':
      return 6;
    default:
      break;
  }
}

/** 0 => '월' */
export function changeNumberToKoreaDayOfWeek(number) {
  switch (number) {
    case 0:
      return '월';
    case 1:
      return '화';
    case 2:
      return '수';
    case 3:
      return '목';
    case 4:
      return '금';
    case 5:
      return '토';
    case 6:
      return '일';
    default:
      break;
  }
}
// }
