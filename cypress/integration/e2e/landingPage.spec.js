context('Landing', () => {
        beforeEach(() => {
            cy.visit("/");
        });

        
      it("Continue Swipe", () => {

           /*  cy.get('ion-grid');
            cy.get('ion-row');
            cy.get('ion-col');
            cy.get('ion-slides');  cy.get('ion-slide'); */

            Cypress.Commands.add('swipeLeft', () => {
                cy.get('ion-slides')
                  .trigger('mousedown', {position: "right"})
                  .trigger('mousemove', {clientX: 10, clientY: 100})
                  .trigger('mouseup', {force: true})
              });
 
            cy.swipeLeft();
            //cy.swipeLeft();
            //cy.swipeLeft();

        });

 });

/*  describe("Form Test", () => {
   
    it("Can fill the form", () => {
        cy.visit("/");
      });
 }); */

/*  Cypress.Commands.add('swipeLeft', () => {
    cy.get('.swiper-slide-active')
      .trigger('mousedown', {position: "right"})
      .trigger('mousemove', {clientX: 100, clientY: 275})
      .trigger('mouseup', {force: true})
  }); */