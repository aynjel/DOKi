/**
 * Environment variables for Production Build.
 */
export const environment = {
  production: true,
  // apiRouterUrl: 'https://doctorsportal.chonghua.com.ph/api/',
  apiRouterUrl: "/api/", // For IIS Deployment where Frontend and Backend are deployed in one server.
  linkRouterUrl: "https://doki.chonghua.com.ph/",
  //apiRouterUrlTest: 'http://localhost:5000',
  apiRouterUrlTest: window["env"]["API_URL"],
  // apiRouterUrl: 'http://10.128.18.112:9091/api/',
  apiResident: "http://10.151.12.120:7230/",
  consoleLog: false,
  API_URL: window["env"]["API_URL"],
  callHistory: "https://doki.chonghua.com.ph/api/",
};
