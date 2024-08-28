/**
 *
 * @param {*} date 需要转换的日期
 * @returns 返回相对时间
 */
export function timeAgo(date) {
  const rtf = new Intl.RelativeTimeFormat("zh", { numeric: "auto" });
  const now = Date.now();
  data = new Date(date).getTime();
  const diffInSeconds = (now - date) / 1000;

  if (diffInSeconds < 60)
    return rtf.format(-Math.floor(diffInSeconds), "second");
  if (diffInSeconds < 3600)
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
  if (diffInSeconds < 86400)
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
  if (diffInSeconds < 604800)
    return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
  if (diffInSeconds < 2419200)
    return rtf.format(-Math.floor(diffInSeconds / 604800), "week");
  if (diffInSeconds < 29030400)
    return rtf.format(-Math.floor(diffInSeconds / 2419200), "month");
  return rtf.format(-Math.floor(diffInSeconds / 29030400), "year");
}

/**
 *
 * @param {*} date 需要转换的日期
 * @param {*} format 转换格式
 * @returns 返回指定格式的日期字符串
 */
function formatDate(date, format) {
  const map = {
    MM: date.getMonth() + 1,
    dd: date.getDate(),
    yyyy: date.getFullYear(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  };

  return format.replace(/MM|dd|yyyy|HH|mm|ss/gi, (matched) => {
    return map[matched].toString().padStart(2, "0");
  });
}
