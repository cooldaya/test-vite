import { httpGet, httpPost } from "../http";
// 获取天气
// location 是经纬度坐标
// icon使用方式 https://icons.qweather.com/usage/#icon-font
export async function getWeatherInfo(location = "106.5478767,29.5647398") {
  const defaultParams = {
    key: "f38a0bccfb384ccca9ef711ee645386c",
    lang: "zh",
  };
  const params = { ...defaultParams, location };

  const res = await httpGet(
    "https://devapi.qweather.com/v7/weather/now",
    params,
  );
  const _data = res?.data?.now || {};
  const dataMap = new Map([
    [
      "温度",
      {
        prop: "temp",
        value: _data.temp,
        unit: "℃",
      },
    ],
    [
      "观测时间",
      {
        prop: "obsTime",
        value: _data.obsTime,
        unit: "",
      },
    ],
    [
      "体感温度",
      {
        prop: "feelsLike",
        value: _data.feelsLike,
        unit: "℃",
      },
    ],
    [
      "图标",
      {
        prop: "icon",
        value: _data.icon,
        unit: "",
      },
    ],
    [
      "文字",
      {
        prop: "text",
        value: _data.text,
        unit: "",
      },
    ],
    [
      "风向角度",
      {
        prop: "wind360",
        value: _data.wind360,
        unit: "",
      },
    ],
    [
      "风向",
      {
        prop: "windDir",
        value: _data.windDir,
        unit: "",
      },
    ],
    [
      "风力等级",
      {
        prop: "windScale",
        value: _data.windScale,
        unit: "",
      },
    ],
    [
      "风速",
      {
        prop: "windSpeed",
        value: _data.windSpeed,
        unit: "公里/小时",
      },
    ],
    [
      "湿度",
      {
        prop: "humidity",
        value: _data.humidity,
        unit: "%",
      },
    ],
    [
      "降雨", // 过去一小时
      {
        prop: "precip",
        value: _data.precip,
        unit: "mm",
      },
    ],
    [
      "大气压强", // 过去一小时
      {
        prop: "pressure",
        value: _data.pressure,
        unit: "hPa",
      },
    ],
    [
      "能见度", // 过去一小时
      {
        prop: "vis",
        value: _data.vis,
        unit: "公里",
      },
    ],
    [
      "云量", // 过去一小时
      {
        prop: "cloud",
        value: _data.cloud,
        unit: "%",
      },
    ],
    [
      "露点温度", // 过去一小时
      {
        prop: "dew",
        value: _data.dew,
        unit: "℃",
      },
    ],
  ]);

  return {
    dataMap,
    now: _data,
  };
}

getWeatherInfo();
