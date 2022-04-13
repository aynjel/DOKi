var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsUrl");

var userAccount;

describe("Actions", () => {
  describe("6 - In-Patients Page", () => {
    beforeEach(() => {
        // cy.viewport(390, 844)
        cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
        cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - Filter CEBU site", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clickmenu(1);
      cy.wait(1000);

      cy.get('[id="ion-button-filter-cebu"]').click();
      cy.wait(1000);

      cy.testInPatientsDetails("CEBU");
    });

    it("Test Scenario 2 - Filter MANDAUE site", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clickmenu(1);
      cy.wait(1000);

      cy.get('[id="ion-button-filter-cebu"]').click();
      cy.wait(1000);

      // cy.testInPatientsDetails("MANDAUE");
    });


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
