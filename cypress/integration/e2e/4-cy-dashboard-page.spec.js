/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("4 - Dashboard Page", () => {
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - Skip Onboarding, then Login, Load Dashboard and then Click Total Admitted route.", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clickDashboard("Admitted")

      cy.end()
    });

    it("Test Scenario 2 - Load Dashboard then Click Total For Discharge route.", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clickDashboard("For Discharge")

      cy.end()
    });
  });
});
