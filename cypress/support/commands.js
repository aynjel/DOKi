// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('swipeLeft', () => {
    cy.get('ion-slides')
      .trigger('mousedown', {position: "right"})
      .trigger('mousemove', {clientX: 100, clientY: 275})
      .trigger('mouseup', {force: true})
  });

/**
 * Slider Commands
 */
// First Slide
Cypress.Commands.add('firstSlideGoRight', () => {
    cy.get('ion-button[id="first-slide-button-right"]').click();
  });

// Second Slide
Cypress.Commands.add('secondSlideGoRight', () => {
    cy.get('ion-button[id="second-slide-button-right"]').click();
  });
  Cypress.Commands.add('secondSlideGoLeft', () => {
    cy.get('ion-button[id="second-slide-button-left"]').click();
  });

// Third Slide
  Cypress.Commands.add('thirdSlideGoRight', () => {
    cy.get('ion-button[id="third-slide-button-right"]').click();
  });
  Cypress.Commands.add('thirdSlideGoLeft', () => {
    cy.get('ion-button[id="third-slide-button-left"]').click();
  });

// Fourth Slide
Cypress.Commands.add('fourthSlideGoLeft', () => {
    cy.get('ion-button[id="fourth-slide-button-left"]').click();
  });

// Left To Right
Cypress.Commands.add('leftToRight', () => {
    // Left To Right
    cy.firstSlideGoRight();
    cy.wait(1000);
    cy.secondSlideGoRight();
    cy.wait(1000);
    cy.thirdSlideGoRight();
    cy.wait(1000);
  });

  Cypress.Commands.add('rightToLeft', () => {
     // Right To Left
     cy.fourthSlideGoLeft();
     cy.wait(1000);
     cy.thirdSlideGoLeft();
     cy.wait(1000);
     cy.secondSlideGoLeft();
     cy.wait(1000);
  });

  

