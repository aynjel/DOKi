/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("6 - In-Patients Page", () => {
    beforeEach(() => {
        cy.viewport(390, 844)
        cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
        cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it.only("Test Scenario 1 - Filter CEBU site", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clickmenu(1);
      cy.wait(1000);

      cy.get('[id="ion-button-filter-cebu"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("CEBU");
    });

    it.only("Test Scenario 2 - Filter MANDAUE site", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clickmenu(1);
      cy.wait(1000);

      cy.get('[id="ion-button-filter-mandaue"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("MANDAUE");
    });

    // tab-button-in-patients

    it("Test Scenario 3 - Filter BOTH (CEBU AND MANDAUE) sites", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clickmenu(1);
      cy.wait(1000);

      cy.get('[id="ion-button-filter-cebu"]').click();
      cy.wait(1000);

      // cy.testInPatientsDetails("BOTH");
    });
  });
});
