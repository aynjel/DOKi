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
 * -------------------------------------------------------------------------
 * CUSTOM COMMANDS
 * -------------------------------------------------------------------------
 */

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


  // Do Clickable Element
  Cypress.Commands.add('doClick', (elementText) =>{
    cy.contains(elementText).click();
    cy.wait(1000);
  });


/**
 * -------------------------------------------------------------------------
 * CUSTOM COMMAND IMPLEMENTATION
 * -------------------------------------------------------------------------
 */

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

// Right To Left
Cypress.Commands.add('rightToLeft', () => {
    // Right To Left
    cy.fourthSlideGoLeft();
    cy.wait(1000);
    cy.thirdSlideGoLeft();
    cy.wait(1000);
    cy.secondSlideGoLeft();
    cy.wait(1000);
 });

 // Accept Data Privacy Agreement
  Cypress.Commands.add('acceptAgreement', () =>{
    cy.doClick("Accept");
    cy.doClick("SAVE");
  });

// Accept Data Privacy Agreement, Log In then continue
  Cypress.Commands.add('acceptAgreementLoginContinue', (alertWindow) =>{
    cy.doClick("LOG IN");
    cy.acceptAgreement();
    if(alertWindow){
        cy.doClick("Okay");
    }
  });

// Log In
Cypress.Commands.add('login', (userName, password) =>{
    cy.get("ion-grid");
    cy.get('ion-input[id="input-username"]')
        .type(userName)
        .should("have.value", userName);
    cy.get('ion-input[id="input-password"]')
        .type(password)
        .should("have.value", password);
    cy.acceptAgreementLoginContinue(false);
    cy.contains('Welcome');
  });

// Where Am I
Cypress.Commands.add('whereAmI', (url) =>{
    cy.url().should('eq', url);
});

// Navigate Tab Menu
Cypress.Commands.add('navigateTabMenu', (startValue) =>{
    var ndx = startValue;
    var i;
    var buttonId="";
    if(startValue == 0 ){
        for (i = ndx; i < tabUrl.length; i++) {
            cy.goToTabMenu(i);
          };
    }else{
        for (i = ndx; i >= 0; i--) {
            cy.goToTabMenu(i);
          };
    }
});

// Goto Tab Menu
Cypress.Commands.add('goToTabMenu', (tabIndex) =>{
  var buttonId="";  
    buttonId = 'ion-button[id="' + tabButtonId[tabIndex] + '"]';
    cy.get(buttonId).click();
    cy.whereAmI(tabUrl[tabIndex]);
    cy.wait(1000);
});

var tabUrl = ["http://localhost:8100/menu/dashboard", 
"http://localhost:8100/menu/in-patients", 
"http://localhost:8100/menu/appointments",
"http://localhost:8100/menu/settings"];
var tabButtonId = ["button-dashboard",
                   "button-in-patients", 
                   "button-appointments",  
                   "button-settings"                 
                    ];

// Generate Random Number
function generateRandomNumber(arrayLength){
  return Math.floor(Math.random() * arrayLength); 
}