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
    cy.get('ion-button[id="first-slide-button-right"]').click().end();
  });

// Second Slide
Cypress.Commands.add('secondSlideGoRight', () => {
    cy.get('ion-button[id="second-slide-button-right"]').click().end();
  });
  Cypress.Commands.add('secondSlideGoLeft', () => {
    cy.get('ion-button[id="second-slide-button-left"]').click().end();
  });

// Third Slide
  Cypress.Commands.add('thirdSlideGoRight', () => {
    cy.get('ion-button[id="third-slide-button-right"]').click().end();
  });
  Cypress.Commands.add('thirdSlideGoLeft', () => {
    cy.get('ion-button[id="third-slide-button-left"]').click().end();
  });

// Fourth Slide
Cypress.Commands.add('fourthSlideGoLeft', () => {
    cy.get('ion-button[id="fourth-slide-button-left"]').click().end();
  });


  // Do Clickable Element
  Cypress.Commands.add('doClick', (elementText) =>{
    cy.contains(elementText).click().end();
    //cy.wait(1000);
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
    cy.get('ion-checkbox[id="acceptCheckBox"]').click();
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

  Cypress.Commands.add('invalidUserCredential', (alertWindow) =>{
    cy.doClick("LOG IN");
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
    cy.wait(5000);
    cy.contains('Welcome').end();
  });

  Cypress.Commands.add('loginAndTestDataPrivacy', (userName, password) =>{
    cy.get("ion-grid");
    cy.get('ion-input[id="input-username"]')
        .type(userName)
        .should("have.value", userName);
    cy.get('ion-input[id="input-password"]')
        .type(password)
        .should("have.value", password);
    cy.contains('Welcome').end();
    cy.doClick("LOG IN");
    cy.wait(2000);
    cy.testDataPrivacy();
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

// Test In-Patients Detail
Cypress.Commands.add('testInPatientsDetails', (site) =>{
  cy.get('body').then(($body => {
    // synchronously query from body
    // to find which element was created
    if ($body.find('h2').length) {
      // p was found, do something else here
      //return 'input'
      cy.get('p').then((el)=> {
        switch(site){
          case "CEBU":
            assert.include(el.text(), "Chong Hua Hospital");
            break;
          case "MANDAUE":
            assert.include(el.text(), "Chong Hua Hospital Mandaue");
            break;
          case "BOTH":
            assert.include(el.text(), "Chong Hua Hospital");
            assert.include(el.text(), "Chong Hua Hospital Mandaue");
        }
      });
    };
}));
});

/**
 * Test Onboarding Left to Right
 */
Cypress.Commands.add("onboarding", () => {
  cy.get("ion-grid");
  cy.wait(1000);
  // Left To Right
  cy.firstSlideGoRight();
  cy.wait(1000);
  cy.secondSlideGoRight();
  cy.wait(1000);
  cy.thirdSlideGoRight();
  cy.wait(1000);

  cy.doClick("LET'S GO!");
  //cy.doClick("INSTALL");
  cy.wait(1000);
  cy.whereAmI(loginUrl);
});

/**
 * Test Jump to Login from Onboarding
 */
Cypress.Commands.add("jumpToLogin", () => {
  cy.visit("/");
  cy.wait(5000);
  cy.doClick("LET'S GO!");
  //cy.doClick("INSTALL");
  //cy.wait(1000);
  cy.whereAmI(loginUrl);
});

/**
 * Test Data Privacy
 * Updated by: Roberto Pedroza
 * Date Updated: Nov-09-2020
 * Remarks: New
 */
// ===============================================================================
  Cypress.Commands.add('testDataPrivacy', () =>{
    cy.get('body').then(($body => {
      if ($body.find('ion-checkbox[id="acceptCheckBox"]').length) {
        //cy.get()
        cy.acceptAgreement();
      };
    }));
  });
// ===============================================================================
Cypress.Commands.add('getTestUserAccount', () =>{
  var data;
  cy.fixture('testUserAccount').then(function (data) {
    this.data = data;
    return this.getdata;
  });
});

var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsUrl");
var appointmentsUrl = Cypress.env("baseUrlToTest") + Cypress.env("appointmentsUrl");
var settingsUrl = Cypress.env("baseUrlToTest") + Cypress.env("settingsUrl");

var tabUrl = [dashboardUrl, inpatientsUrl, appointmentsUrl, settingsUrl];

var tabButtonId = ["button-dashboard",
                   "button-in-patients", 
                   "button-appointments",  
                   "button-settings"                 
                    ];


