export const useSWRFetcher = (args: RequestInfo) => fetch(args).then(res => res.json())
