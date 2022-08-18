/// <reference types='cypress'/>

describe("Actions", () => {
  describe("3 - Onboarding Pages", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Test Scenario 1 - Navigate Right-To-Left, Left-To-Right then LET'S GO!", () => {

      //Left to Right
      cy.get("ion-button").contains('NEXT').click({ force: true })
      cy.url({ timeout: 5000 }).should("include", Cypress.env('baseUrlToTest'))

      cy.get("ion-button").contains('NEXT').click({ force: true })
      cy.url({ timeout: 5000 }).should("include", Cypress.env('baseUrlToTest'))

      cy.get("ion-button").contains('NEXT').click({ force: true })
      cy.url({ timeout: 5000 }).should("include", Cypress.env('baseUrlToTest'))

      cy.get("ion-button").contains('GO BACK').click({ force: true })
      cy.url({ timeout: 5000 }).should("include", Cypress.env('baseUrlToTest'))

      cy.get("ion-button").contains('SKIP').click({ force: true })
      cy.url({ timeout: 5000 }).should("include", Cypress.env('baseUrlToTest'))

      cy.get("ion-button").contains('GO BACK').click({ force: true })
      cy.url({ timeout: 5000 }).should("include", Cypress.env('baseUrlToTest'))

      cy.end
    });
  });
});
