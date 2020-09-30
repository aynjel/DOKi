context('Actions', () => {
    context('Login', () => {

        beforeEach(() => {
            cy.visit("http://localhost:8100/login");
        });

        it("(1) Username or Password is empty.", () =>{
            cy.get("ion-grid");
            cy.get('ion-button[id="btn-confirm"]').click();
            cy.contains('Okay').click();
        });
       
        it("(2) Username or Password not in the Database.", () =>{
            cy.get("ion-grid");
            cy.get('ion-input[id="input-username"]')
                .type("MD0001751")
                .should("have.value", "MD0001751");
            cy.get('ion-input[id="input-password"]')
                .type("02/08/19541")
                .should("have.value", "02/08/19541");
            cy.get('ion-button[id="btn-confirm"]').click();
            cy.contains('Okay').click();
        });

        it("(3) Username and Password are valid.", () =>{
            cy.get("ion-grid");
            cy.get('ion-input[id="input-username"]')
                .type("MD000175")
                .should("have.value", "MD000175");
            cy.get('ion-input[id="input-password"]')
                .type("02/08/1954")
                .should("have.value", "02/08/1954");
            cy.get('ion-button[id="btn-confirm"]').click();
            cy.contains('Welcome');
        });
    });
        
});