var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");

//var dataPwUrl = Cypress.env("apiRouterUrl") + "common/Login/Validate"; 

var userAccount;

 var dataPw = "";

context("Actions", () => {
  context("9 - End Test", () => {
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
     it("Test Scenario 1 - Data Privacy Opt-Out", () => {
    cy.loginAndTestDataPrivacy(userAccount[0].userName, userAccount[2].newPassword);
    cy.whereAmI(dashboardUrl);
    cy.wait(2000);
     cy.goToTabMenu(3);
     //cy.whereAmI(settingsUrl);
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

     it("Test Scenario 2 - Restore Password", () => {
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
  }); //end
});
