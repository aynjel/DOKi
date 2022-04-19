/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("10 - Professional Fee", () => {
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - Input Professional Fee as non insurance coordinator and have not seen patient", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.get('body').then(($body => {
        if ($body.find('h2').length) {
          cy.get('[data-testid="IPC100230411"]').click()
          cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411")
        };
      }))
      cy.wait(1000)

      cy.contains("Professional Fee ").click()
      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee")

      cy.wait(1000)
      cy.contains("Modify").click()

      cy.get('[name="ion-cb-7"]').click({ force: true }) //Have you seen this Patient?
      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee-transaction-summary")

      cy.wait(2000)
      cy.get('ion-button').contains("Submit").click({force: true})

      cy.wait(2000)
      cy.contains("Okay").click({ force: true})

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 2 - Input Professional Fee as insurance coordinator & have not seen patient", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.get('body').then(($body => {
        if ($body.find('h2').length) {
          cy.get('[data-testid="IPC100230411"]').click()
          cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411")
        };
      }))
      cy.wait(1000)

      cy.contains("Professional Fee ").click()
      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee")

      cy.wait(1000)
      cy.contains("Modify").click()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-7"]').click({ force: true }) //Have you seen this Patient?
      // cy.get('[name="ion-cb-8"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee-transaction-summary")

      cy.wait(2000)
      cy.get('ion-button').contains("Submit").click({force: true})

      cy.wait(2000)
      cy.contains("Okay").click({ force: true})

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 3 - Input Professional Fee as non insurance coordinator & have seen patient, Insurance + Philhealth", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.get('body').then(($body => {
        if ($body.find('h2').length) {
          cy.get('[data-testid="IPC100230411"]').click()
          cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411")
        };
      }))
      cy.wait(1000)

      cy.contains("Professional Fee ").click()
      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee")

      cy.wait(1000)
      cy.contains("Modify").click()

      // cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      // cy.get('[name="ion-cb-7"]').click({ force: true }) //Have you seen this Patient?
      cy.get('[name="ion-cb-8"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/insurance")

      cy.get('[name="ion-input-0"]').type("1000")
      cy.contains("Next").click({ force: true })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/insurance")

      cy.wait(2000)
      cy.get('ion-button').contains("Submit").click({force: true})

      cy.wait(2000)
      cy.contains("Okay").click({ force: true})

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });


    it("Test Scenario 4 - Input Professional Fee as insurance coordinator & have seen patient, Personal + Philhealth ", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.get('body').then(($body => {
        if ($body.find('h2').length) {
          cy.get('[data-testid="IPC100230411"]').click()
          cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411")
        };
      }))
      cy.wait(1000)

      cy.contains("Professional Fee ").click()
      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee")

      cy.wait(1000)
      cy.contains("Modify").click()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-9"]').click({ force: true }) //Personal + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/personal-philhealth")

      cy.get('[name="ion-input-0"]').type("1000")
      cy.contains("Next").click({ force: true })

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/personal-philhealth")
      
      cy.wait(2000)
      cy.get('ion-button').contains("Submit").click({force: true})

      cy.wait(2000)
      cy.contains("Okay").click({ force: true})

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 5 - Input Professional Fee as insurance coordinator & have seen patient, Philhealth Only ", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.get('body').then(($body => {
        if ($body.find('h2').length) {
          cy.get('[data-testid="IPC100230411"]').click()
          cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411")
        };
      }))
      cy.wait(1000)

      cy.contains("Professional Fee ").click()
      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee")

      cy.wait(1000)
      cy.contains("Modify").click()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-10"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/philhealth")
      cy.contains("Next").click({force:true})
      
      cy.wait(2000)
      cy.get('ion-button').contains("Submit").click({force: true})

      cy.wait(2000)
      cy.contains("Okay").click({ force: true})

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });

    it("Test Scenario 6 - Input Professional Fee as insurance coordinator & have seen patient, Charity ", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.get('body').then(($body => {
        if ($body.find('h2').length) {
          cy.get('[data-testid="IPC100230411"]').click()
          cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411")
        };
      }))
      cy.wait(1000)

      cy.contains("Professional Fee ").click()
      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee")

      cy.wait(1000)
      cy.contains("Modify").click()

      cy.get('[name="ion-cb-6"]').click({ force: true }) //click Are you an Insurance Coordinator
      cy.get('[name="ion-cb-11"]').click({ force: true }) //Insurance + PhilHealth

      cy.contains("Next").click()

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl") + "/IPC100230411/professional-fee/charity")
      cy.contains("Thank you").should("contain.text","Thank you for your generosity, Dok!")
      cy.contains("Next").click({force:true})
      
      cy.wait(2000)
      cy.get('ion-button').contains("Submit").click({force: true})

      cy.wait(2000)
      cy.contains("Okay").click({ force: true})

      cy.url({ timeout: 30000 }).should("include", Cypress.env("inpatientsUrl"))
    });
  })
})