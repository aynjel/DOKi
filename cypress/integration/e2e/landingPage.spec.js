context('Landing', () => {

        beforeEach(() => {
            cy.visit("/");
        });

      it("Navigate", () => {

        cy.get("ion-grid");
        
         // Left To Right
        cy.firstSlideGoRight();
        cy.wait(1000);
        cy.secondSlideGoRight();
        cy.wait(1000);
        cy.thirdSlideGoRight();
        cy.wait(1000);

         // Right To Left
        cy.fourthSlideGoLeft();
        cy.wait(1000);
        cy.thirdSlideGoLeft();
        cy.wait(1000);
        cy.secondSlideGoLeft();
        cy.wait(1000);

         // Left To Right
         cy.firstSlideGoRight();
         cy.wait(1000);
         cy.secondSlideGoRight();
         cy.wait(1000);
         cy.thirdSlideGoRight();
         cy.wait(3000);

         // Click Let's Go Button
         //cy.get('ion-button[id="button-lets-go"]').click();

        });
    
 });
