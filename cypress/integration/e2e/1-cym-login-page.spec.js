/// <reference types='cypress'/>

var userAccount;

describe("Actions 1 - Mobile Login Page", () => {
    beforeEach("", () => {
        cy.viewport(390, 844)
        cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))
        cy.fixture('testUserAccount').then(function (data) {
            userAccount = data;
        });
    });
    
    it("1. Test Scenario 1 - Username or Password is empty.", () => {
        cy.contains("LOG IN").click()
        cy.get('[id="alert-1-msg"]').should("contain.text", "Sorry, Dok. We cannot log you in at the moment. Please try again.")

        cy.end()
    });

    it("2. Test Scenario 2 - Username and Passwords are valid", () => {
        cy.login(userAccount[0].userName, userAccount[0].password, true)

        cy.end()
    });

    it("3. Test Scenario 3 - Invalid Username", () => {
        cy.errLogin(userAccount[0].userName, userAccount[0].password, "invalid-user")

        cy.end()
    }); 

    it("4. Test Scenario 4 - Invalid Password", () => {
        cy.errLogin(userAccount[0].userName, userAccount[0].password, "invalid-pass")

        cy.end()
    });
});