/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("4 - Dashboard Page", () => {
    beforeEach(() => {
      cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - Skip Onboarding, then Login, Load Dashboard and then Click Total Admitted route.", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      //set for mobile view
      cy.get('body').then(($body => {
        if ($body.find('[id="button-dashboard"]').length > 0) {
          cy.get('[id="button-dashboard"]').click()
          cy.get('[id="ion-item-ac"]').click()
        }
        else {
          cy.get('[name="options-outline"').click()
          cy.get('[data-desc="Admitted"]').click()
        }
      }))

      cy.url({timeout: 30000}).should("include", Cypress.env("inpatientsAdmittedUrl"))
      cy.end()
    });

    it("Test Scenario 2 - Load Dashboard then Click Total For Discharge route.", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      //set for mobile view
      cy.get('body').then(($body => {
        if ($body.find('[id="button-dashboard"]').length > 0) {
          cy.get('[id="button-dashboard"]').click()
          cy.get('[id="ion-item-dn"]').click()
        }
        else {
          cy.get('[name="options-outline"').click()
          cy.get('[data-desc="For Discharge"]').click()
        }
      }))

      cy.url({timeout: 30000}).should("include", Cypress.env("inpatientsDischargedUrl"))
      cy.end()
    });
  });
});
