export const requestInterceptor = (config) => {
  
  return config;
};

export const responseInterceptor = (response) => {
  return response.data;
};
