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
