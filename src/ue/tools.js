import { httpGet } from "@/request/http";

const ssServerApis = {
  startServer: `${window.kt_config.ss_server}/api/startServer`,
};

export const getSSUrl = async () => {
  const ktConfig = window.kt_config;
  let ss = ktConfig.ss;
  if (!ktConfig.multipleSs) return ss;
  const apiUrl = `${ktConfig.multipleSsServer}/api/startServer`;
  const res = await (await fetch(apiUrl)).json();
  if (res.code !== 200) {
    alert(res.message);
    return ss;
  }
  ss = "ws://" + (res?.data?.data?.ipAddress || res?.data?.ipAddress);
  return ss;
};