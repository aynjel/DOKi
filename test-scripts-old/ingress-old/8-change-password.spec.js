var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var settingsUrl = Cypress.env("baseUrlToTest") + Cypress.env("settingsUrl");

var userAccount;

context("Actions", () => {
  context("8 - Change Password", () => {
    beforeEach(() => {

       // Load Test Data
      // -------------------------------------------------
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
        });
      // --------------------------------------------------

      cy.jumpToLogin();
    });

   it("Test Scenario 1 - Validate Change Password Window Properties", () => {
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
        cy.end();
    });

     it("Test Scenario 2 - Cancel Change Password", () => {
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

        cy.cancelChangePassword(
            userAccount[2].oldPassword,
            userAccount[2].newPassword,
            userAccount[2].confirmPassword);
        cy.end();
    });

    it("Test Scenario 3 - Change Password", () => {
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

        cy.testUpdatePasswordFromSetting(
            userAccount[2].oldPassword,
            userAccount[2].newPassword,
            userAccount[2].confirmPassword);
      
        cy.doClick("Okay");
        cy.wait(2000);

        cy.end();

        //  VALIDATE: Login using Old Password
        //cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[2].newPassword);
        //cy.wait(1000);
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
