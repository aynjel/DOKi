var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsAdmittedUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsAdmittedUrl");
var inpatientsDischargedUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsDischargedUrl");

context("Actions", () => {
  context("Dashboard Page", () => {
    beforeEach(() => {
      cy.jumpToLogin();
    });

    it("Test Scenario 1 - Skip Onboarding, then Login, Load Dashboard and then Click Total Admitted route.", () => {
      cy.login("MD000175", "02/08/1954");
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);
      cy.get("ion-grid");
      cy.get('ion-item[id="ion-item-ac"]').click();
      cy.wait(1000);
      cy.whereAmI(inpatientsAdmittedUrl);
    });

    it("Test Scenario 2 - Load Dashboard then Click Total For Discharge route.", () => {
      cy.login("MD000175", "02/08/1954");
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);
      cy.get("ion-grid");
      cy.get('ion-item[id="ion-item-dn"]').click();
      cy.wait(1000);
      cy.whereAmI(inpatientsDischargedUrl);
    });
  });
});
