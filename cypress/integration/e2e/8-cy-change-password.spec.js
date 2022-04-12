/// <reference types='cypress'/>

var userAccount;

describe("Actions", () => {
  describe("8 - Change Password", () => {
    beforeEach(() => {
      // cy.viewport(390, 844)
      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
      })
    });

    it("Test Scenario 1 - Validate Change Password Window Properties", () => {
      cy.login(userAccount[0].userName, userAccount[0].password, true)

      cy.clicktab(3)
      cy.wait(1000)

      cy.contains("Change Password").click({force: true})
      cy.wait(1000)
      
      cy.contains("Current Password")
      cy.contains("New Password")
      cy.contains("Confirm New Password")
      cy.contains("SAVE")
      cy.contains("CANCEL")
      cy.contains("Close").click()
      
      cy.url().should("include", Cypress.env("settingsUrl"))
      cy.end()
    });

    it("Test Scenario 2 - Cancel Change Password", () => {
      cy.login(userAccount[6].userName, userAccount[6].password, true)

      cy.clicktab(3)
      cy.wait(1000)

      cy.contains("Change Password").click({force: true})
      cy.wait(1000)

      cy.cancelChangePassword(
        userAccount[7].oldPassword,
        userAccount[7].newPassword,
        userAccount[7].confirmPassword);
      cy.end();
    });

    it("Test Scenario 3 - Valid Change Password", () => {
      cy.login(userAccount[6].userName, userAccount[6].password, true)

      cy.clicktab(3)
      cy.wait(1000)

      cy.contains("Change Password").click({force: true})
      cy.wait(1000)

      cy.testUpdatePasswordFromSetting(
        userAccount[7].oldPassword,
        userAccount[7].newPassword,
        userAccount[7].confirmPassword);

      cy.contains("Okay").click();
      cy.wait(2000);

      cy.url({timeout: 10000}).should("include", Cypress.env("loginUrl"))

      cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
      cy.wait()

      cy.get('[name="ion-input-0"]').should("exist").type(userAccount[6].userName)
      cy.get('[name="ion-input-1"]').should("exist").type(userAccount[6].password)

      cy.contains("LOG IN").click()

      cy.get('[id="alert-1-msg"]').should("contain.text", "Incorrect Credentials for user")

      cy.get('button').should("have.class", "alert-button").click()

      cy.end()
    });

    it("Test Scenario 4 - Invalid, New and Old Password are the same", () => {
      cy.login(userAccount[8].userName, userAccount[8].password, true)

      cy.clicktab(3)
      cy.wait(1000)

      cy.contains("Change Password").click({force: true})
      cy.wait(1000)

      cy.wait(500)
      cy.get('ion-input[id="input-password1"]')
        .type(userAccount[9].oldPassword, { parseSpecialCharSequences: false, delay: 10 })

      cy.wait(500)
      cy.get('ion-input[id="password"]')
        .type(userAccount[9].newPassword, { parseSpecialCharSequences: false, delay: 10 })

      cy.wait(500)
      cy.get('ion-input[id="confirmPassword"]')
        .type(userAccount[9].confirmPassword, { parseSpecialCharSequences: false }, { delay: 10 })

      cy.contains("SAVE").click()

      cy.contains("Current Password (Old and New Passwords are the same)")
      .should("have.text", "Current Password (Old and New Passwords are the same)")

    });

    it.only("Test Scenario 5 - Invalid Blank New Password", () => {
      cy.login(userAccount[8].userName, userAccount[8].password, true)

      cy.clicktab(3)
      cy.wait(1000)

      cy.contains("Change Password").click({force: true})
      cy.wait(1000)

      cy.wait(500)
      cy.get('ion-input[id="input-password1"]')
        .type(userAccount[9].oldPassword, { parseSpecialCharSequences: false, delay: 10 })

      cy.wait(500)
      cy.get('ion-input[id="confirmPassword"]')
        .type(userAccount[9].confirmPassword, { parseSpecialCharSequences: false }, { delay: 10 })

      cy.get('[id="btn-confirm"]').should("have.attr", "ng-reflect-disabled", "true")


    });

  });
});
