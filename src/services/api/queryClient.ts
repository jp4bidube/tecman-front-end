import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
      cacheTime: 1000 * 20,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
