context('Landing', () => {
        beforeEach(() => {
            cy.visit("/");
        });

        
      it("Continue Swipe", () => {

        cy.get('ion-slides')
            .trigger('pointerdown', { which: 1 })
            .trigger('pointermove',{clientX: 100, clientY: 275})
            .trigger('pointerup', { force: true });
        
            cy.get('ion-slides')
            .trigger('mousedown', {which: 2})
            .trigger('mousemove', {clientX: 100, clientY: 275})
            .trigger('mouseup', {force: true});
 
            //cy.swipeLeft();
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