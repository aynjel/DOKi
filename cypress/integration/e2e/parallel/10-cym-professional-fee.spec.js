/// <reference types='cypress'/>

const l = require("@lottiefiles/lottie-player");
const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require("constants");

var userAccount;

describe("Actions", () => {
  describe("10 - Mobile Professional Fee", () => {
    beforeEach(() => {
      cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - Input Professional Fee as non insurance coordinator and have not seen patient w/ SMS", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.setProfFee()

      cy.get('[name="ion-cb-7"]').click({ force: true }) //Have you seen this Patient?
      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee-transaction-summary")

      cy.contains("Submit").click()
      cy.contains("Okay").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 2 - Input Professional Fee as insurance coordinator & have not seen patient", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.setProfFee()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-7"]').click({ force: true }) //Have you seen this Patient?
      // cy.get('[name="ion-cb-8"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee-transaction-summary")

      cy.contains("Submit").click()
      cy.contains("Okay").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 3 - Input Professional Fee as non insurance coordinator & have seen patient, Insurance + Philhealth  w/out SMS", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.setProfFee()

      cy.get('[name="ion-cb-8"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/insurance")

      cy.get('[name="ion-input-0"]').type("1000")
      cy.contains("Next").click({ force: true })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/insurance")

      cy.contains("Submit").click()
      cy.contains("Okay").click({ force: true, timeout: 10000 })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });


    it("Test Scenario 4 - Input Professional Fee as insurance coordinator & have seen patient, Personal + Philhealth ", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.setProfFee()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-9"]').click({ force: true }) //Personal + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/personal-philhealth")

      cy.get('[name="ion-input-0"]').type("1000")
      cy.contains("Next").click({ force: true })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/personal-philhealth")
      cy.contains("Submit").click()

      cy.contains("Okay").click({ force: true, timeout: 10000 })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 5 - Input Professional Fee as insurance coordinator & have seen patient, Philhealth Only ", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.setProfFee()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-10"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/philhealth")
      cy.contains("Next").click({ force: true })

      cy.contains("Submit").click()

      cy.contains("Okay").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 6 - Input Professional Fee as insurance coordinator & have seen patient, Charity ", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.SMSToggle() // send sms

      cy.setProfFee()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-11"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/charity")
      cy.contains("Thank you").should("contain.text", "Thank you for your generosity, Dok!")
      cy.contains("Next").click({ force: true })

      cy.contains("Submit").click()

      cy.contains("Okay").click({ timeout: 10000 })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 7 - Scenario 3 non tax vat ", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.SMSToggle() // send sms

      cy.setProfFee()

      cy.get('[name="ion-cb-8"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/insurance")

      cy.get('[name="ion-input-0"]').type("1000")
      cy.get('[name="ion-cb-12"]').click({ force: true }) //tax

      cy.contains("Next").click({ force: true })

      cy.contains("No VAT")

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/insurance")

      cy.contains("Submit").click()
      cy.contains("Okay").click({ force: true, timeout: 10000 })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });


  })
})