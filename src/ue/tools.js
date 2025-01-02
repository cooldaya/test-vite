import { httpGet } from "@/request/http";

const ssServerApis = {
  startServer: `${window.kt_config.ss_server}/api/startServer`,
};

export async function getSSUrl() {
  let ss = window.kt_config.ss;
  const res = await httpGet(ssServerApis.startServer);
  if (res.code !== 200) {
    alert(res.code);
    return {
      ss,
    };
  }
  const url = "ws://" + res?.data?.data?.ipAddress;
  ss = url;

  return {
    ss,
  };
}
