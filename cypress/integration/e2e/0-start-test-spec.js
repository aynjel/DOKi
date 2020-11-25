var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var userAccount;

context("Actions", () => {
  context("Start Test", () => {
    beforeEach(() => {

      // Load Test Data
      // -------------------------------------------------
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
        });
      // --------------------------------------------------

      cy.jumpToLogin();
    });

    /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 1 - Change Password.", () => {
      cy.loginAndTestDataPrivacy(userAccount[3].userName,userAccount[3].password);
      cy.whereAmI(dashboardUrl);
    });

  }); 
});
