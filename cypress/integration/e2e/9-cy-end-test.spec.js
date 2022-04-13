/// <reference types='cypress'/>

var userAccount;

var dataPw = "";

describe("Actions", () => {
  describe("9 - End Test", () => {
    beforeEach(() => {
      // cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    })

    it.only("Test Scenario 1 - Restore Password", () => {
      cy.request({
        method: 'PUT',
        url: "https://doctorsportal.chonghua.com.ph/api/common/Login/Validate",
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          "appCode": "DPP",
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
            method: 'PUT',
            url: "https://doctorsportal.chonghua.com.ph/api/common/Login/ChangePassword",
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              "appCode": "DPP",
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
          })
        })
      })
    })
  })
})