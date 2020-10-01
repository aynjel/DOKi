context('Actions', () => {
    context('Navigate Menu', () => {
        beforeEach(() => {
            cy.visit("http://localhost:8100/login");
        });


        it("Test Scenario 1 - Dashboard to Settings Vice-Versa", () => {

            cy.login("MD000175","02/08/1954");
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);

            cy.navigateTabMenu(0);
            cy.wait(1000);
            cy.navigateTabMenu(2);

        });
        it("Test Scenario 2 - Settings to Dashboard Vice-Versa", () => {
            cy.login("MD000175","02/08/1954");
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);

            cy.navigateTabMenu(3);
            cy.wait(1000);
            cy.navigateTabMenu(0);
           
        });

    });
});