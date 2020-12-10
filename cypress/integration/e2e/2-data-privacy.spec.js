var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var settingsUrl = Cypress.env("baseUrlToTest") + Cypress.env("settingsUrl");

var userAccount; 

context("Actions", () => {

    context("2 - Data Privacy", () => {
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
     it("Initialize Test Data . . .", () => {
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
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
          .type(userAccount[0].userName)
          .should("have.value", userAccount[0].userName);
        cy.get('ion-input[id="input-password"]')
          .type(userAccount[0].password)
          .should("have.value", userAccount[0].password);

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
           .type(userAccount[0].userName)
           .should("have.value", userAccount[0].userName);
         cy.get('ion-input[id="input-password"]')
           .type(userAccount[0].password)
           .should("have.value", userAccount[0].password);
 
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
       /*  it("Test Scenario 3 - Opt-out.", () => {
        cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
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
       }); */ 

    });
});