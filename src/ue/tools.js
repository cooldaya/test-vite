export const getSSUrl = async () => {
  const ktConfig = window.kt_config;
  let ss = ktConfig.ss;
  if (!ktConfig.multiple_ss) return ss;
  const apiUrl = `${ktConfig.multiple_ss_server}/api/startServer`;
  const res = await (await fetch(apiUrl)).json();
  if (res.code !== 200) {
    alert(res.message);
    return ss;
  }
  ss = "ws://" + (res?.data?.data?.ipAddress || res?.data?.ipAddress);
  return ss;
};