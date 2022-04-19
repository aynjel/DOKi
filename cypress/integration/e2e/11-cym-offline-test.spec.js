/// <reference types='cypress'/>

const goOffline = () => {
    cy.log('**go offline**')
        // .then(() => {
        //     return Cypress.automation('remote:debugger:protocol',
        //         {
        //             command: 'Network.enable',
        //         })
        // })
        .then(() => {
            return Cypress.automation('remote:debugger:protocol',
                {
                    command: 'Network.enable',
                    command: 'Network.emulateNetworkConditions',
                    params: {
                        offline: true,
                        latency: -1,
                        downloadThroughput: -1,
                        uploadThroughput: -1,
                    },
                })
        })
}
// https://github.com/cypress-io/cypress/issues/17723
const goOnline = () => {
    // disable offline mode, otherwise we will break our tests :)
    cy.log('**go online**')
    .then(() => {
      // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: false,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        })
    })
    // .then(() => {
    //   return Cypress.automation('remote:debugger:protocol',
    //     {
    //       command: 'Network.disable',
    //     })
    // })
  }

var userAccount;

describe("Actions", () => {
    describe("7 - Mobile Offline Page", () => {

        beforeEach(() => {
            cy.viewport(390, 844)
            cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
            cy.fixture('testUserAccount').then(function (data) {
                userAccount = data;
            })
            goOnline()
        });

        afterEach(() => {
            goOnline()
            cy.reload()
            cy.url({ timeout: 10000 }).should("include", Cypress.env("loginUrl"))
        })

        it("Test Scenario 1 - Login then Set offline", () => {
            cy.login(userAccount[0].userName, userAccount[0].password, true)

            goOffline()

            cy.contains("Dashboard")

            cy.end()
        });
    });
});
