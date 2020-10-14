var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");

context("Actions", () => {
  context("Logout Page", () => {
    beforeEach(() => {
      cy.jumpToLogin();
    });

    it("Test Scenario 1 - Login then Logout", () => {
      cy.login("MD000175", "02/08/1954");
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);
      cy.get('ion-button[id="button-logout"]').click();
      cy.wait(1000);
      cy.whereAmI(loginUrl);
    });
  });
});
