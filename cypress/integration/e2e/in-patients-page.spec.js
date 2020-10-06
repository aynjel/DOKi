
context('Actions', () => {
    context('In-Patients Page', () => {

        beforeEach(() => {
            cy.visit("http://localhost:8100/login");
        });

        it("Test Scenario 1 - Filter CEBU", () =>{
            cy.login("MD000175","02/08/1954");
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);

            cy.goToTabMenu(1);
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/in-patients");

            cy.get('ion-button[id="ion-button-filter-cebu"]').click();
            cy.wait(1000);
            cy.get('p').then((el)=> {
                assert.include(el.text(), "Chong Hua Hospital");  // this works but it isn't pretty
              });
              cy.wait(1000);
        });
        it("Test Scenario 1 - Filter MANDAUE", () =>{
            cy.login("MD000175","02/08/1954");
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);

            cy.goToTabMenu(1);
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/in-patients");
            
            cy.get('ion-button[id="ion-button-filter-mandaue"]').click();
            cy.wait(1000);
            cy.get('p').then((el)=> {
                assert.include(el.text(), "Chong Hua Hospital Mandaue");  // this works but it isn't pretty
              });

        });


    });
});