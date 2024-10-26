import useSWRV from "swrv";
import LocalStorageCache from "swrv/dist/cache/adapters/localStorage";

export default function useSwrvTool(key, fetcher, options) {
  const defaultOPtions = {
    dedupingInterval: 300,
    refreshInterval: 1000 * 60 * 10, // 10 minutes
    cache: new LocalStorageCache("swrv"),
    shouldRetryOnError: false,
    ttl: 1000 * 60 * 10, // 10 minutes
  };
  return useSWRV(key, fetcher, Object.assign(defaultOPtions, options));
}
