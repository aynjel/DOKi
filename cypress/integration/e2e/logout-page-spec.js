context('Actions', () => {
    context('Logout Page', () => {

        beforeEach(() => {
            cy.visit("http://localhost:8100/login");
        });

        it("Test Scenario 1 - Login then Logout", () => {
            cy.login("MD000175","02/08/1954");
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);
            cy.get('ion-button[id="button-logout"]').click();
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/login");
        });

    });
});