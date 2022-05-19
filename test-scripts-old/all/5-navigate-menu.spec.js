var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");

var userAccount;

context("Actions", () => {
  context("5 - Navigate Menu", () => {
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
    it("Test Scenario 1 - Dashboard to Settings Vice-Versa", () => {
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.navigateTabMenu(0);
      cy.wait(1000);
      cy.navigateTabMenu(2);
    });

     /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 2 - Settings to Dashboard Vice-Versa", () => {
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.navigateTabMenu(3);
      cy.wait(1000);
      cy.navigateTabMenu(0);
    });

     /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 3 - Random Navigation 10 possibities", () => {
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);
      var i;

      for (i = 1; i <= 10; i++) {
        cy.goToTabMenu(Math.floor(Math.random() * 4));
        cy.wait(1000);
      }
    });
  });
});
