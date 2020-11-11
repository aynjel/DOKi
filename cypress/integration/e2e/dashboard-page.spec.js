var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsAdmittedUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsAdmittedUrl");
var inpatientsDischargedUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsDischargedUrl");

var userAccount;

context("Actions", () => {
  context("Dashboard Page", () => {
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
    it("Test Scenario 1 - Skip Onboarding, then Login, Load Dashboard and then Click Total Admitted route.", () => {
      cy.loginAndTestDataPrivacy(userAccount.userName,userAccount.password);
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);
      cy.get("ion-grid");
      cy.get('ion-item[id="ion-item-ac"]').click();
      cy.wait(1000);
      cy.whereAmI(inpatientsAdmittedUrl);
    });

     /**
    * Okay as of Nov/09/2020
    */ 
    it("Test Scenario 2 - Load Dashboard then Click Total For Discharge route.", () => {
      cy.loginAndTestDataPrivacy(userAccount.userName,userAccount.password);
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
      cy.get("ion-grid");
      cy.get('ion-item[id="ion-item-dn"]').click();
      cy.wait(1000);
      cy.whereAmI(inpatientsDischargedUrl);
    });
  });
});
