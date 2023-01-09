/**
 * Environment variables for Production Build.
 */
export const environment = {
  production: true,
  // apiRouterUrl: 'https://doctorsportal.chonghua.com.ph/api/',
  apiRouterUrl: "http://10.151.12.119:9092/api/", // For IIS Deployment where Frontend and Backend are deployed in one server.
  linkRouterUrl: "https://doki.chonghua.com.ph/",
  //apiRouterUrlTest: 'http://localhost:5000',
  apiRouterUrlTest: "https://api01.chonghua.com.ph",
  // apiRouterUrl: 'http://10.128.18.112:9091/api/',
  apiResident: "http://10.151.12.120:7230/",
  consoleLog: false,
  API_URL: window["env"]["API_URL"],
};
