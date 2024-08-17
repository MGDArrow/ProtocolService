import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ru';
import { IDate } from '../types/types';
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);
dayjs.locale('ru');


export function getDayJS(date: number):dayjs.Dayjs {
  return dayjs(date);
}

export function getTextDate(dateObj: IDate) {
  if (dateObj.year !== null && dateObj.month !== null && dateObj.day !== null) {
    const date = new Date(dateObj.year, dateObj.month, dateObj.day);
    return dayjs(date).format('DD MMMM YYYY');
  } else if (dateObj.month !== null && dateObj.day !== null) {
    const date = new Date(1800, dateObj.month, dateObj.day);
    return dayjs(date).format('DD MMMM');
  } else if (dateObj.year !== null && dateObj.month !== null) {
    const date = new Date(dateObj.year, dateObj.month, 1);
    return dayjs(date).format('MMMM YYYY');
  } else if (dateObj.year !== null) {
    const date = new Date(dateObj.year, 1, 1);
    return dayjs(date).format('YYYY');
  } else return '';
}

export function formatDate(date:dayjs.Dayjs) {
  return dayjs(date).format('dd. DD MMMM YYYY');
}


export function getWeekText(date:dayjs.Dayjs) {
  return `${dayjs(date).day(1)
    .format('DD/MM/YYYY')} — ${dayjs(date).day(7)
    .format('DD/MM/YYYY')}`;
}

export function getWeekDates(date:dayjs.Dayjs) {
  const dates = [];
  for (let i = 1; i <= 7; i++) dates.push(dayjs(date).day(i));

  return dates;
}

export function changeWeek(date:dayjs.Dayjs, inc: 1 | -1 | 0) {
  if (inc === 1) return dayjs(date).add(1, 'week');
  else if (inc === -1) return dayjs(date).subtract(1, 'week');
  else return getDayJS(Date.now());
}

export function checkDate(dateCalendar:dayjs.Dayjs, datePersona: IDate | null, option: boolean) {
  if (!option) return false;
  if (datePersona === null) return false;
  if (datePersona.month === null || datePersona.day === null) return false;

  if (+datePersona.month === dayjs(dateCalendar).month()
    && +datePersona.day === dayjs(dateCalendar).date()
  ) return true;
  else return false;
}


export function getDateForInput(dateObj:IDate | null) {
  if (dateObj === null) return { year: null, month: null, day: null };
  const endDate = { year: dateObj.year, month: dateObj.month, day: dateObj.day };
  if (endDate.month !== null) endDate.month += 1;
  if (endDate.day === endDate.year) endDate.day = null;
  return endDate;
}

export function getDateForDB(dateObj:IDate) {
  const endDate = { year: dateObj.year, month: dateObj.month, day: dateObj.day };
  if (!endDate.year && !endDate.month && !endDate.day) return null;
  if (endDate.month !== null) endDate.month -= 1;
  if (endDate.day === endDate.year) endDate.day = null;
  return endDate;
}


function getDateLongTime(dateFrom: IDate | null, dateTo:dayjs.Dayjs): number | boolean {
  if (dateFrom === null) return false;
  if (dateFrom.year === null) return false;
  if (dateFrom.month === null || dateFrom.day === null) return dateTo.year() - dateFrom.year;

  const dateFromJs = dayjs(new Date(dateFrom.year, dateFrom.month, dateFrom.day));

  return dateTo.diff(dateFromJs, 'year');
}

export function getDateLong(dateFrom: IDate | null, dateTo:dayjs.Dayjs | number = getDayJS(Date.now())): string {
  let dateToJs;
  if (typeof dateTo === 'number') dateToJs = getDayJS(dateTo);
  else dateToJs = dateTo;

  const date = getDateLongTime(dateFrom, dateToJs);
  if (typeof date === 'boolean' || date === 0) return '';
  let year = 'лет';
  if (date % 10 === 1) year = 'год';
  if (date % 10 === 2) year = 'года';
  if (date % 10 === 3) year = 'года';
  if (date % 10 === 4) year = 'года';
  if ([
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
  ].includes(date)) year = 'лет';
  return `(${date.toString()} ${year})`;
}

export function getIsThisDate(dateFrom: IDate | null, dateTo:dayjs.Dayjs | number = getDayJS(Date.now())) {
  let dateToJs;
  if (typeof dateTo === 'number') dateToJs = getDayJS(dateTo);
  else dateToJs = dateTo;

  if (dateFrom === null) return false;
  if (dateFrom.month === null || dateFrom.day === null) return false;

  return +dateFrom.month === +dateToJs.month() && +dateFrom.day === +dateToJs.date();
}

export function getDateGift(date: string | null) {
  if (date) return dayjs(new Date(date)).format('DD MMMM YYYY');
  else return '';
}
