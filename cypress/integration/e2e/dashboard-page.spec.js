context('Actions', () => {
    context('Dashboard Page', () => {

        beforeEach(() => {
            cy.visit("http://localhost:8100/login");
        });

        it("Test Scenario 1 - Load Dashboard then Click Total Admitted route.", () =>{
            cy.login("MD000175","02/08/1954");
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);
            cy.get("ion-grid");
            cy.get('ion-item[id="ion-item-ac"]').click();
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/in-patients/AC");
        });

        it("Test Scenario 2 - Load Dashboard then Click Total For Discharge route.", () =>{
            cy.login("MD000175","02/08/1954");
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/dashboard");
            cy.wait(1000);
            cy.get("ion-grid");
            cy.get('ion-item[id="ion-item-dn"]').click();
            cy.wait(1000);
            cy.whereAmI("http://localhost:8100/menu/in-patients/DN");
        });


    });
});