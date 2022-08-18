/// <reference types='cypress'/>

const l = require("@lottiefiles/lottie-player");
const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require("constants");

var userAccount;

describe("Actions", () => {
  describe("10 - Mobile MedCert", () => {
    beforeEach(() => {
      cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - View Inbox", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clicktab(5)
      cy.reload()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inboxUrl"))
    });

    it("Test Scenario 2 - View For Approval, For Revisions and Approved Med Certs", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clicktab(5)
      cy.reload()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inboxUrl"))

      cy.contains("for Approval").click({force: true});
      cy.contains("Medical Certificate").should("contain","Medical Certificate (for Approval)")
      cy.wait(2000)

      cy.contains("for Revision").click({force: true});
      cy.contains("Medical Certificate").should("contain","Medical Certificate (for Revision)")
      cy.wait(2000)

      cy.contains("Approved").click({force: true});
      cy.contains("Medical Certificate").should("contain","Medical Certificate (Approved)")
      cy.wait(2000)
    });
  })
})