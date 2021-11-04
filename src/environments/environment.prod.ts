/**
 * Environment variables for Production Build.
 */
export const environment = {
  production: true,
  // apiRouterUrl: 'https://doctorsportal.chonghua.com.ph/api/',
  apiRouterUrl: '/api/', // For IIS Deployment where Frontend and Backend are deployed in one server.
  linkRouterUrl: 'http://10.128.18.112:9092/',
  // apiRouterUrl: 'http://10.128.18.112:9091/api/',
  consoleLog: false
};
