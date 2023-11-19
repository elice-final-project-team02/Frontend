import moment from 'moment';
import 'moment/locale/ko';

// 사용법 임포트 후 dateFormatter.changeDateToDayOfTheWeek(date) 쓴다

export default class dateFormatter {
  /** 금요일 */
  static changeDateToDayOfTheWeek(date) {
    return moment(date).format('dddd');
  }
  /** 11/14(금) */
  static changeDateToMonthAndDateAndDayOfTheWeek(date) {
    return moment(date).format('MM/DD(dd)');
  }

  /** 14:00 */
  static changeDateToHHMM(date) {
    return moment(date).format('HH:00');
  }

  /** 월 => 0 */
  static changeKoreaDayOfWeekToNumber(day) {
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
  static changeNumberToKoreaDayOfWeek(number) {
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
}
