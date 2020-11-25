var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var settingsUrl = Cypress.env("baseUrlToTest") + Cypress.env("settingsUrl");

var userAccount;

context("Actions", () => {
  context("Change Password", () => {
    beforeEach(() => {

       // Load Test Data
      // -------------------------------------------------
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
        });
      // --------------------------------------------------

      cy.jumpToLogin();
    });

   /*  it("Test Scenario 1 - Validate Change Password Window Properties", () => {
        cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
        cy.wait(1000);
        cy.whereAmI(dashboardUrl);
        cy.wait(1000);
        cy.goToTabMenu(3);
        cy.wait(1000);
        cy.whereAmI(settingsUrl);
        cy.wait(1000);
        cy.doClick("Change Password");
        cy.wait(1000);
        cy.contains("Old Password");
        cy.contains("New Password");
        cy.contains("Confirm Password");
        cy.contains("SAVE");
        cy.contains("CANCEL");
        cy.doClick("Close");
        cy.whereAmI(settingsUrl);
    }); */

    /* it("Test Scenario 2 - Cancel Change Password", () => {
        cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
        cy.wait(1000);
        cy.whereAmI(dashboardUrl);
        cy.wait(1000);
        cy.goToTabMenu(3);
        cy.wait(1000);
        cy.whereAmI(settingsUrl);
        cy.wait(1000);
        cy.doClick("Change Password");
        cy.wait(1000);
        cy.contains("Old Password");
        cy.contains("New Password");
        cy.contains("Confirm Password");
        cy.contains("SAVE");
        cy.contains("CANCEL");

        // Input
        cy.get('ion-input[id="input-old-password"]')
            .type(userAccount[2].oldPassword)
            .should("have.value", userAccount[2].oldPassword);

        cy.get('ion-input[id="input-new-password"]')
            .type(userAccount[2].newPassword)
            .should("have.value", userAccount[2].newPassword);

        cy.get('ion-input[id="input-confirm-password"]')
            .type(userAccount[2].confirmPassword)
            .should("have.value", userAccount[2].confirmPassword);  
        
        // Click Cancel Button
        cy.doClick("CANCEL");
        cy.wait(1000);
        cy.whereAmI(settingsUrl);

    }); */

    it("Test Scenario 3 - Cancel Change Password", () => {
        cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
        cy.wait(1000);
        cy.whereAmI(dashboardUrl);
        cy.wait(1000);
        cy.goToTabMenu(3);
        cy.wait(1000);
        cy.whereAmI(settingsUrl);
        cy.wait(1000);
        cy.doClick("Change Password");
        cy.wait(1000);
        cy.contains("Old Password");
        cy.contains("New Password");
        cy.contains("Confirm Password");
        cy.contains("SAVE");
        cy.contains("CANCEL");

        // Input
        cy.get('ion-input[id="input-old-password"]')
            .type(userAccount[2].oldPassword)
            .should("have.value", userAccount[2].oldPassword);

        cy.get('ion-input[id="input-new-password"]')
            .type(userAccount[2].newPassword)
            .should("have.value", userAccount[2].newPassword);

        cy.get('ion-input[id="input-confirm-password"]')
            .type(userAccount[2].confirmPassword)
            .should("have.value", userAccount[2].confirmPassword);  
        
        // Click Cancel Button
        cy.doClick("CANCEL");
        cy.wait(1000);

        // Assert
        cy.whereAmI(settingsUrl);

        // Click Logout
        cy.get('ion-button[id="button-logout"]').click();
        cy.wait(1000);
        cy.whereAmI(loginUrl);

        // Clear Username Input Text
        //cy.get("ion-grid");
        //cy.get('ion-input[id="input-username"]').clear();

        // Clear Password Input Text
        //cy.get('ion-input[id="input-password"]').clear();

        //cy.get('[type="text"]').clear();cy.focused.clear();
        //cy.get('[type="password"]').clear();
        //cy.focused.clear();

        //  VALIDATE: Login using Old Password
        cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[2].oldPassword);
        cy.wait(1000);
        //cy.whereAmI(dashboardUrl);

    });

    /* it("Test Scenario 2 - Invalid, New and Old Password are the same", () => {
    });

    it("Test Scenario 5 - Invalid Blank New Password", () => {
    });

    it("Test Scenario 5 - Valid Change Password", () => {
    }); */

  });
});
