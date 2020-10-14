var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");

context("Actions", () => {
  context("Login Page", () => {
    beforeEach(() => {
      cy.jumpToLogin();
    });

    it("Test Scenario 1 - Username or Password is empty.", () => {
      cy.get("ion-grid");
      cy.acceptAgreementLoginContinue(true);
      cy.whereAmI(loginUrl);
    });

    it("Test Scenario 2 - Username or Password not in the Database.", () => {
      cy.get("ion-grid");
      cy.get('ion-input[id="input-username"]')
        .type("MD0001751")
        .should("have.value", "MD0001751");
      cy.get('ion-input[id="input-password"]')
        .type("02/08/19541")
        .should("have.value", "02/08/19541");
      cy.acceptAgreementLoginContinue(true);
      cy.whereAmI(loginUrl);
    });

    it("Test Scenario 3 - Username and Password are valid.", () => {
      cy.get("ion-grid");
      cy.get('ion-input[id="input-username"]')
        .type("MD000175")
        .should("have.value", "MD000175");
      cy.get('ion-input[id="input-password"]')
        .type("02/08/1954")
        .should("have.value", "02/08/1954");
      cy.acceptAgreementLoginContinue(false);
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
    });
  });
});
