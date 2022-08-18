/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("2 - Mobile Data Privacy", () => {
    beforeEach(() => {
      cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Initialize Test Data . . .", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)
      cy.optOut(true)

      cy.end();
    });

    it("Test Scenario 1 - Decline Data Privacy.", () => {
      cy.wait(3000)
      
      cy.login(userAccount[0].userName, userAccount[0].password, false)

      cy.end();
    });

    it("Test Scenario 2 - Accept Data Privacy.", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true) 

      cy.end();
    });
  });
});