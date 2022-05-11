/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("7 - Logout Page", () => {
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - Login then Logout", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.logout()

      cy.end()
    });
  });
});
