var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");

context("Actions", () => {
  context("Logout Page", () => {
    beforeEach(() => {
      cy.jumpToLogin();
    });

    /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 1 - Login then Logout", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);
      cy.get('ion-button[id="button-logout"]').click();
      cy.wait(1000);
      cy.whereAmI(loginUrl);
    });
  });
});
