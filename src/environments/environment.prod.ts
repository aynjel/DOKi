/**
 * Environment variables for Production Build.
 */
export const environment = {
  production: true,
  // apiRouterUrl: 'https://doctorsportal.chonghua.com.ph/api/',
  apiRouterUrl: "https://doki.chonghua.com.ph/api/", // For IIS Deployment where Frontend and Backend are deployed in one server.
  linkRouterUrl: "https://doki.chonghua.com.ph/",
  //apiRouterUrlTest: 'http://localhost:5000',
  apiRouterUrlTest: "https://api.chonghua.com.ph",
  // apiRouterUrl: 'http://10.128.18.112:9091/api/',
  apiResident: "http://10.151.12.120:7230/",
  consoleLog: false,
  API_URL: window["env"]["API_URL"],
  callHistory: window["env"]["API_URL"],
  dischargeInstruction: "https://dev-api02.chonghua.com.ph/",
  DEV_CHH_PN: "https://sdg-pn-api.chonghua.com.ph/api/v1/",
};
