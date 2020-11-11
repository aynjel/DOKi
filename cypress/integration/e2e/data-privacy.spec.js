var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var settingsUrl = Cypress.env("baseUrlToTest") + Cypress.env("settingsUrl");
 
context("Actions", () => {

    context("Data Privacy", () => {
      beforeEach(() => {
        cy.jumpToLogin();
      });

        /**
      * Okay as of Nov/09/2020
      */
     it("Initialize Test Data . . .", () => {
      cy.loginAndTestDataPrivacy('50534','50534');
      cy.whereAmI(dashboardUrl);

      cy.goToTabMenu(3);
         cy.wait(2000);
         cy.whereAmI(settingsUrl);
         cy.get('ion-toggle[id="dataPrivacyToggle"]').click();
         // Assert
         cy.wait(2000);
         cy.contains("Cancel");
         cy.wait(2000);

        cy.contains("Yes, Opt-Out").click();
        cy.wait(2000);
        cy.whereAmI(loginUrl); 

         cy.end();
    });
      
      /**
        * Okay as of Nov/09/2020
      */
      it("Test Scenario 1 - Decline Data Privacy.", () => {
       cy.get("ion-grid");
        cy.get('ion-input[id="input-username"]')
          .type("50534")
          .should("have.value", "50534");
        cy.get('ion-input[id="input-password"]')
          .type("50534")
          .should("have.value", "50534");

        cy.doClick("LOG IN");
        cy.wait(2000);
        cy.contains("Accept");
        cy.wait(2000);
        cy.contains("Close").click();
        cy.wait(2000);
        cy.wait(2000);
        cy.whereAmI(loginUrl);
        cy.end();
      });

      /**
        * Okay as of Nov/09/2020
      */
      it("Test Scenario 2 - Accept Data Privacy.", () => {
        cy.get("ion-grid");
         cy.get('ion-input[id="input-username"]')
           .type("50534")
           .should("have.value", "50534");
         cy.get('ion-input[id="input-password"]')
           .type("50534")
           .should("have.value", "50534");
 
         cy.doClick("LOG IN");
         cy.wait(2000);
         cy.contains("Accept");

         cy.acceptAgreement();

         cy.whereAmI(dashboardUrl);
         cy.end();
       });

       /**
        * Okay as of Nov/09/2020
       */
       it("Test Scenario 3 - Opt-out.", () => {
        cy.loginAndTestDataPrivacy('50534','50534');
        cy.whereAmI(dashboardUrl);

         cy.goToTabMenu(3);
         cy.wait(2000);
         cy.whereAmI(settingsUrl);
         cy.wait(2000);
         cy.get('ion-toggle[id="dataPrivacyToggle"]').click();
         cy.wait(2000);
        // Assert
         cy.contains("Cancel");
        cy.wait(2000);
        cy.contains("Yes, Opt-Out").click();
        cy.wait(2000);
        cy.whereAmI(loginUrl);

         cy.end();
       });

    });
});