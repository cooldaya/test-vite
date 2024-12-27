/**
 * 
 * @param {*} num 被格式化的数字
 * @param {*} decimalPlaces 保留小数位数
 * @returns 
 */
export function saveDecimalNum(num, decimalPlaces = 2) {
  let _num = Number(num);
  const _decimalPlaces = Math.pow(10, decimalPlaces);
  return Math.round(_num * _decimalPlaces) / _decimalPlaces;
}


// 给对象数组添加percent属性，并保留两位小数
export function addPercentToObjArr(
  arr,
  valueKey = "value",
  percentKey = "percent",
) {
  if (!arr || !arr.length) return arr;
  const total = arr.reduce((acc, cur) => acc + cur[valueKey], 0);

  let percentTotal = 0;
  return arr.map((item) => {
    const percent = saveDecimalNum((item[valueKey] / total) * 100, 2);
    percentTotal += percent;
    item[percentKey] = percent;
    return item;
  });

  const lastItem = arr.at(-1);
  lastItem[percentKey] = saveDecimalNum(
    lastItem[percentKey] + 100 - percentTotal,
    2,
  );
  return arr;
}

