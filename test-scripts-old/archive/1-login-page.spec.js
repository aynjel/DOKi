var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var userAccount;

context("Actions", () => {
  context("1 - Login Page", () => {
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
   it("Test Scenario 1 - Username or Password is empty.", () => {
      cy.doClick("LOG IN");
      cy.wait(2000);
      cy.doClick('Okay')
      cy.whereAmI(loginUrl);
   });
    
   /**
    * Okay as of Nov/25/2020
    * NOT Okay as of Nov/09/2020 ... need to Update DPP-404
    */
   it("Test Scenario 2 - Username or Password not in the Database.", () => {
      cy.wait(2000);
      cy.get("ion-grid");
      cy.get('ion-input[id="input-username"]')
        .type(userAccount[1].userName)
        .should("have.value", userAccount[1].userName);
      cy.get('ion-input[id="input-password"]')
        .type(userAccount[1].password)
        .should("have.value", userAccount[1].password);
        cy.doClick("LOG IN");
        cy.wait(2000);
        cy.doClick('Okay')
        cy.whereAmI(loginUrl);
    });
 
    /**
    * Okay as of Nov/09/2020
    */
    it("Test Scenario 3 - Username and Password are valid.", () => {
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
      cy.whereAmI(dashboardUrl);
    });

  }); 
});
