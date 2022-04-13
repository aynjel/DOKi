/// <reference types='cypress'/>

var userAccount;

describe("Actions 1 - Login Page", () => {
    beforeEach("", () => {
        cy.visit(Cypress.env('baseUrlToTest') + Cypress.env('loginUrl'))

        cy.fixture('testUserAccount').then(function (data) {
            userAccount = data;
        });
    });
    
    it("1. Test Scenario 1 - Username or Password is empty.", () => {
        cy.contains("LOG IN").click()

        cy.get('[id="alert-1-msg"]').should("contain.text", "Sorry, Dok. We cannot log you in at the moment. Please try again.")
    });

    it("2. Test Scenario 2 - Username and Passwords are valid", () => {
        cy.login(userAccount[0].userName, userAccount[0].password, true)
    });

    it("3. Test Scenario 3 - Invalid Username", () => {
        cy.get('[name="ion-input-0"]').should("exist").type(userAccount[4].userName)
        cy.get('[name="ion-input-1"]').should("exist").type(userAccount[4].password)

        cy.contains("LOG IN").click()

        cy.get('[id="alert-1-msg"]').should("contain.text","No Accounts Registered with")

        cy.get('button').should("have.class", "alert-button").click()
    }); 

    it("4. Test Scenario 4 - Invalid Password", () => {
        cy.get('[name="ion-input-0"]').should("exist").type(userAccount[3].userName)
        cy.get('[name="ion-input-1"]').should("exist").type(userAccount[3].password)

        cy.contains("LOG IN").click()

        cy.get('[id="alert-1-msg"]').should("contain.text", "Incorrect Credentials for user")

        cy.get('button').should("have.class", "alert-button").click()
    });
});