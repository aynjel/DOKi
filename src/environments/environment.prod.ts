/**
 * Environment variables for Production Build.
 */
export const environment = {
  production: true,
  // apiRouterUrl: 'https://doctorsportal.chonghua.com.ph/api/',
  apiRouterUrl: '/api/', // For IIS Deployment where Frontend and Backend are deployed in one server.
  linkRouterUrl: 'https://doki.chonghua.com.ph/',
  //apiRouterUrlTest: 'http://localhost:5000',
  apiRouterUrlTest: 'https://api01.chonghua.com.ph',
  // apiRouterUrl: 'http://10.128.18.112:9091/api/',
  consoleLog: false,
};
