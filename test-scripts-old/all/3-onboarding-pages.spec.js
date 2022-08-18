var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");

context("Actions", () => {
  context("3 - Onboarding Pages", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Test Scenario 1 - Navigate Right-To-Left, Left-To-Right then LET'S GO!", () => {
      cy.get("ion-grid");

      // Left To Right
      cy.firstSlideGoRight();
      cy.wait(1000);
      cy.secondSlideGoRight();
      cy.wait(1000);
      cy.thirdSlideGoRight();
      cy.wait(1000);

      // Right To Left
      cy.fourthSlideGoLeft();
      cy.wait(1000);
      cy.thirdSlideGoLeft();
      cy.wait(1000);
      cy.secondSlideGoLeft();
      cy.wait(1000);

      // Left To Right
      cy.firstSlideGoRight();
      cy.wait(1000);
      cy.secondSlideGoRight();
      cy.wait(1000);
      cy.thirdSlideGoRight();
      cy.wait(1000);

      cy.doClick("LET'S GO!");
      cy.wait(1000);

      cy.whereAmI(loginUrl);
    });
  });
});
