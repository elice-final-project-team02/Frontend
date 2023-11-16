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
}
