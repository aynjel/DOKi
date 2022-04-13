/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("5 - Navigate Menu", () => {
    beforeEach(() => {
      // cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });


    it("Test Scenario 1 - Dashboard to Settings Vice-Versa", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.get('[id="button-dashboard"]').click({force: true})
      cy.clicktab(3)

      cy.end()
    });

    it("Test Scenario 2 - Settings to Dashboard Vice-Versa", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clicktab(3)
      cy.get('[id="button-dashboard"]').click({force: true})

      cy.end()
    });

    it("Test Scenario 3 - Random Navigation 10 possibities", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)
      
      var i;

      for (i = 1; i <= 10; i++) {
        cy.clicktab(Math.floor(Math.random() * 4));
      }
    });
  });
});
