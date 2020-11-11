var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsUrl");

context("Actions", () => {
  context("In-Patients Page", () => {
    beforeEach(() => {
      cy.jumpToLogin();
    });

     /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 1 - Filter CEBU site", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.goToTabMenu(1);
      cy.wait(1000);
      cy.whereAmI(inpatientsUrl);
      cy.wait(1000);
      cy.get('ion-button[id="ion-button-filter-cebu"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("CEBU");
    });

     /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 2 - Filter MANDAUE site", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.goToTabMenu(1);
      cy.wait(1000);
      cy.whereAmI(inpatientsUrl);
      cy.wait(1000);
      cy.get('ion-button[id="ion-button-filter-mandaue"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("MANDAUE");
    });

     /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 3 - Filter BOTH (CEBU AND MANDAUE) sites", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.goToTabMenu(1);
      cy.wait(1000);
      cy.whereAmI(inpatientsUrl);
      cy.wait(1000);
      cy.get('ion-button[id="ion-button-filter-both"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("BOTH");
    });
  });
});
