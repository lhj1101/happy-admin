import moment from 'moment';
import 'moment/locale/zh-cn';  // 导入中文语言包

// 设置全局语言为中文
moment.locale('zh-cn');

// 常用的日期格式
export const DATE_FORMAT = {
  DATE: 'YYYY-MM-DD',
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  MONTH: 'YYYY-MM',
  YEAR: 'YYYY'
} as const;

// 格式化日期
export const formatDate = (date: moment.MomentInput, format: string = DATE_FORMAT.DATE_TIME): string => {
  return moment(date).format(format);
};

// 获取当前时间
export const getNow = (format: string = DATE_FORMAT.DATE_TIME): string => {
  return moment().format(format);
};

// 日期比较
export const isBefore = (date1: moment.MomentInput, date2: moment.MomentInput = moment()): boolean => {
  return moment(date1).isBefore(date2);
};

export const isAfter = (date1: moment.MomentInput, date2: moment.MomentInput = moment()): boolean => {
  return moment(date1).isAfter(date2);
};

// 计算两个日期之间的差值
export const getDuration = (
  date1: moment.MomentInput,
  date2: moment.MomentInput = moment(),
  unit: moment.unitOfTime.Diff = 'days'
): number => {
  return moment(date1).diff(date2, unit);
};

// 添加时间
export const addTime = (
  date: moment.MomentInput,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor = 'days',
  format: string = DATE_FORMAT.DATE_TIME
): string => {
  return moment(date).add(amount, unit).format(format);
};

// 解析时间字符串
export const parseDate = (dateString: string, format?: string): moment.Moment => {
  return format ? moment(dateString, format) : moment(dateString);
};

export default moment; 