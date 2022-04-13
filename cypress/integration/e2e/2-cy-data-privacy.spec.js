/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("2 - Data Privacy", () => {
    beforeEach(() => {
      // cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Initialize Test Data . . .", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clicktab(3)

      cy.reload()
      cy.get('[id="dataPrivacyToggle"]').click({force: true})
      cy.wait(1000)

      cy.contains("Yes, Opt-Out").click({force: true})

      cy.url({timeout: 10000}).should("include", Cypress.env("loginUrl"))

      cy.end();
    });

    it("Test Scenario 1 - Decline Data Privacy.", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, false)

      cy.end();
    });

    it("Test Scenario 2 - Accept Data Privacy.", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true) 

      cy.end();
    });
  });
});