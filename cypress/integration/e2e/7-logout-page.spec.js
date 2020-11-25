var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");

var userAccount;

context("Actions", () => {
  context("Logout Page", () => {
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
    it("Test Scenario 1 - Login then Logout", () => {

      /* cy.request('http://10.128.18.132/doctorPortalPwa/api/AppSetting/GetAppSetting/DPP').then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.wait(5000); */
      
      cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
      cy.wait(1000);
      cy.whereAmI(dashboardUrl);
      cy.wait(1000);
      cy.get('ion-button[id="button-logout"]').click();
      cy.wait(1000);
      cy.whereAmI(loginUrl);
      cy.wait(1000);

      //cy.request('DELETE','http://10.128.18.132/doctorPortalPwa/api/UserSetting/Delete');
    });
  });
});
