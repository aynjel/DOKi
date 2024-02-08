// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiRouterUrl: 'https://doctorsportal.chonghua.com.ph/api/', /* If possible, dev use this to test the behavior of API calls in PROD env. */
  //apiRouterUrl: 'http://10.130.21.166:5002/api/',
  apiRouterUrl: "https://doki.chonghua.com.ph/api/",
  //apiRouterUrlTest: 'http://localhost:5000',
  apiRouterUrlTest: "https://api.chonghua.com.ph",
  linkRouterUrl: "https://doki.chonghua.com.ph/",
  //apiRouterUrl: 'http://10.130.21.214:59201/api/',
  apiResident: "http://10.151.12.120:7230/",
  consoleLog: true,
  API_URL: window["env"]["API_URL"],
  callHistory: window["env"]["API_URL"],
  dischargeInstruction: "https://dev-api02.chonghua.com.ph/",
  DEV_CHH_PN: "https://sdg-pn-api.chonghua.com.ph/api/v1/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
