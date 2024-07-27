import { read, utils } from "xlsx";

/**
 * 
 * @param {*} xlsUrl xls文件url
 * @param {*} keysMap title=>key的映射
 * @returns 
 */
export const getXlsData = async (xlsUrl, keysMap = new Map()) => {
  const titleRows = 0; // 标题行数
  const file = await fetch(xlsUrl).then((response) => response.arrayBuffer()); // 读取文件
  const WB = read(file, { type: "binary" });

  // 转换二维数组数据
  let fileXls = utils.sheet_to_json(WB.Sheets[WB.SheetNames[0]], {
    header: 1,
  });
  const keys = fileXls[0].map((item) => (item + "").trim()); // 取第一行作为keys

  const arr = [];
  for (let i = titleRows + 1; i < fileXls.length; i++) {
    // 从第二行开始xlsx数据
    const item = fileXls[i]; // 取每一行数据
    const obj = {};
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const val = (item[j] + "").trim();
      const _key = keysMap.get(key) || key;
      obj[_key] = val; // 转换key
    }
    arr.push(obj);
  }
  return arr;
};
