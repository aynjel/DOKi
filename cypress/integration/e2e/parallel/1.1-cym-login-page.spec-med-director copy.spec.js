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

    it("1. Test Scenario - Login as Executive", () => {
        cy.loginAsMedDirector(userAccount[10].userName, userAccount[10].password, true, "executive")

        cy.end()
    });

    it("1. Test Scenario - Login as Medical Consultant", () => {
        cy.loginAsMedDirector(userAccount[10].userName, userAccount[10].password, true, "med")

        cy.end()
    });
});