var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsUrl");

var userAccount; 

context("Actions", () => {
  context("6 - In-Patients Page", () => {
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
    it("Test Scenario 1 - Filter CEBU site", () => {
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
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
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
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
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
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
