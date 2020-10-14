var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsUrl");

context("Actions", () => {
  context("In-Patients Page", () => {
    beforeEach(() => {
      cy.jumpToLogin();
    });

    it("Test Scenario 1 - Filter CEBU site", () => {
      cy.login("MD000175", "02/08/1954");
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.goToTabMenu(1);
      cy.wait(1000);
      cy.whereAmI(inpatientsUrl);

      cy.get('ion-button[id="ion-button-filter-cebu"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("CEBU");
    });

    it("Test Scenario 2 - Filter MANDAUE site", () => {
      cy.login("MD000175", "02/08/1954");
      //cy.login("MD000806","09/05/1986");
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.goToTabMenu(1);
      cy.wait(1000);
      cy.whereAmI(inpatientsUrl);

      cy.get('ion-button[id="ion-button-filter-mandaue"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("MANDAUE");
    });

    it("Test Scenario 3 - Filter BOTH (CEBU AND MANDAUE) sites", () => {
      cy.login("MD000175", "02/08/1954"); // With Patients
      //cy.login("MD000806","09/05/1986");    // Without Patients
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);

      cy.goToTabMenu(1);
      cy.wait(1000);
      cy.whereAmI(inpatientsUrl);

      cy.get('ion-button[id="ion-button-filter-both"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("BOTH");
    });
  });
});
