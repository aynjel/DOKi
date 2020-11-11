var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");

context("Actions", () => {
  context("Navigate Menu", () => {
    beforeEach(() => {
      cy.jumpToLogin();
    });

     /**
    * Okay as of Nov/09/2020
    */
   /*  it("Test Scenario 1 - Dashboard to Settings Vice-Versa", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.navigateTabMenu(0);
      cy.wait(1000);
      cy.navigateTabMenu(2);
    }); */

     /**
    * Okay as of Nov/09/2020
    */
   /*  it("Test Scenario 2 - Settings to Dashboard Vice-Versa", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.navigateTabMenu(3);
      cy.wait(1000);
      cy.navigateTabMenu(0);
    }); */

     /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 3 - Random Navigation 50 possibities", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
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
