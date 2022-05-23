/// <reference types='cypress'/>

// https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
// https://github.com/cypress-io/cypress/issues/17723

const goOffline = () => {
    cy.log('**go offline**')
        .then(() => {
            Cypress.automation('remote:debugger:protocol',
                {
                    command: 'Network.enable',
                })
        })
        .then(() => {
            Cypress.automation('remote:debugger:protocol',
                {
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

const goOnline = () => {
    cy.log('**go online**')
        .then(() => {
            Cypress.automation('remote:debugger:protocol',
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
        .then(() => {
            Cypress.automation('remote:debugger:protocol',
                {
                    command: 'Network.disable',
                })
        })
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
        });

        afterEach(() => {
            // goOnline()
        })

        it("Test Scenario 1 - Offline login", () => {
            goOffline()

            cy.get('[name="ion-input-0"]').should("exist").type(userAccount[0].userName)
            cy.get('[name="ion-input-1"]').should("exist").type(userAccount[0].password,)

            goOnline()

            cy.wait(5000)
            cy.contains("LOG IN").click()



            cy.end()
        });
    });
});
