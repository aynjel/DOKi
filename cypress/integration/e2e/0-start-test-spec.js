var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var userAccount;

var dataPw = "";

context("Actions", () => {
  context("0 - Start Test", () => {
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
    * Okay as of Nov/26/2020
    */

   it("Test Scenario 1 - Initialize Password", () => {
    cy.request({
      method : 'PUT',
      url:"https://doctorsportal.chonghua.com.ph/api/common/Login/Validate",
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "appCode" : "DPP",
        "userName": "50534"
      }
      }).then((response) => {
        return new Promise(resolve => {        
            expect(response).property('status').to.equal(200)
            expect(response.body).property('Data').to.not.be.oneOf([null, ""])
            const respBody = response.body;
            dataPw = respBody['Data'];
            cy.log(dataPw);
            resolve(dataPw);

            var responseMessage = "";
            cy.request({
                method : 'PUT',
                url:"https://doctorsportal.chonghua.com.ph/api/common/Login/ChangePassword",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: {
                  "appCode" : "DPP",
                  "userName": "50534",
                  "oldPassword": `${dataPw}`,
                  "newPassword": "1234"
                }
                }).then((response) => {
                  return new Promise(resolve => {        
                      expect(response).property('status').to.equal(200)
                      expect(response.body).property('Message').to.not.be.oneOf([null, ""])
                      const respBody = response.body;
                      responseMessage = respBody['Message']
                      resolve(responseMessage)
                  })
                });
        })
      });
  });

    it("Test Scenario 2 - Update Password.", () => {

      cy.whereAmI(loginUrl);
      cy.wait(3000);

       cy.get("ion-grid");
    cy.get('ion-input[id="input-username"]')
        .type(userAccount[3].userName)
        .should("have.value", userAccount[3].userName);

    cy.get('ion-input[id="input-password"]')
        .type(userAccount[3].password)
        .should("have.value", userAccount[3].password);

    cy.doClick("LOG IN");

    cy.testUpdatePassword(userAccount[0].password,userAccount[0].password);
      
    cy.doClick("Okay");
    cy.wait(2000);

    cy.testDataPrivacy();

    cy.wait(2000);
    cy.whereAmI(dashboardUrl);

    });
  }); 
});
