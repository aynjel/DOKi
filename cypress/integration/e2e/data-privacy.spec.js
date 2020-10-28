var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var settingsUrl = Cypress.env("baseUrlToTest") + Cypress.env("settingsUrl");
 
context("Actions", () => {

    context("Data Privacy", () => {
      beforeEach(() => {
        cy.jumpToLogin();
      });

      it("Test Scenario 1 - Decline Data Privacy.", () => {
       cy.get("ion-grid");
        cy.get('ion-input[id="input-username"]')
          .type("MD000175")
          .should("have.value", "MD000175");
        cy.get('ion-input[id="input-password"]')
          .type("02/08/1954")
          .should("have.value", "02/08/1954");

        cy.doClick("LOG IN");
        cy.contains("Accept");
        cy.contains("Close").click();
        cy.get('ion-button[id="buttonPrivatePolicyAlertClose"]').click();
        cy.whereAmI(loginUrl);
        cy.end();
      });

      it("Test Scenario 2 - Accept Data Privacy.", () => {
        cy.get("ion-grid");
         cy.get('ion-input[id="input-username"]')
           .type("MD000175")
           .should("have.value", "MD000175");
         cy.get('ion-input[id="input-password"]')
           .type("02/08/1954")
           .should("have.value", "02/08/1954");
 
         cy.doClick("LOG IN");
         cy.contains("Accept");

         cy.acceptAgreement();

         cy.whereAmI(dashboardUrl);
         cy.end();
       });

       it("Test Scenario 3 - Opt-out.", () => {
        cy.get("ion-grid");
         cy.get('ion-input[id="input-username"]')
           .type("MD000175")
           .should("have.value", "MD000175");
         cy.get('ion-input[id="input-password"]')
           .type("02/08/1954")
           .should("have.value", "02/08/1954");
 
         cy.doClick("LOG IN");
         cy.contains("Accept");

         cy.acceptAgreement();
         
         cy.whereAmI(dashboardUrl);

         cy.goToTabMenu(3);
         cy.wait(2000);
         cy.whereAmI(settingsUrl);

         // click Private Policy
         cy.get('ion-toggle[id="dataPrivacyToggle"]').click();
         cy.wait(2000);
         cy.contains("Cancel").click();
         // Assert if enable

        //cy.get('ion-toggle[id="dataPrivacyToggle"]').click();
        cy.get('ion-toggle[id="dataPrivacyToggle"]').click();
        cy.wait(2000);
        cy.contains("Yes, Opt-Out").click();
        cy.whereAmI(loginUrl);

         cy.end();
       });


    });
});