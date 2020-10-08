
context('Actions', () => {
    context('In-Patients Page', () => {

        beforeEach(() => {
            cy.visit("http://localhost:8100/login");
        });

        it("Test Scenario 1 - Filter CEBU site", () =>{
            cy.login("MD000175","02/08/1954");
            //cy.login("MD000806","09/05/1986");
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);

            cy.goToTabMenu(1);
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/in-patients");

            cy.get('ion-button[id="ion-button-filter-cebu"]').click();
            cy.wait(1000);

            cy.testInPatientsDetails("CEBU");
        });

        it("Test Scenario 2 - Filter MANDAUE site", () =>{
            cy.login("MD000175","02/08/1954");
            //cy.login("MD000806","09/05/1986");
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);

            cy.goToTabMenu(1);
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/in-patients");

            cy.get('ion-button[id="ion-button-filter-mandaue"]').click();
            cy.wait(1000);
           
            cy.testInPatientsDetails("MANDAUE");
        });

        it("Test Scenario 3 - Filter BOTH (CEBU AND MANDAUE) sites", () =>{
            cy.login("MD000175","02/08/1954");      // With Patients
            //cy.login("MD000806","09/05/1986");    // Without Patients
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);

            cy.goToTabMenu(1);
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/in-patients");

            cy.get('ion-button[id="ion-button-filter-both"]').click();
            cy.wait(1000);

            cy.testInPatientsDetails("BOTH");
        });

    });
});