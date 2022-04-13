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
    .trigger('mousedown', { position: "right" })
    .trigger('mousemove', { clientX: 100, clientY: 275 })
    .trigger('mouseup', { force: true })
})

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
  cy.get('ion-button[id="first-slide-button-right"]').click().end()
})

// Second Slide
Cypress.Commands.add('secondSlideGoRight', () => {
  cy.get('ion-button[id="second-slide-button-right"]').click().end()
})
Cypress.Commands.add('secondSlideGoLeft', () => {
  cy.get('ion-button[id="second-slide-button-left"]').click().end()
})

// Third Slide
Cypress.Commands.add('thirdSlideGoRight', () => {
  cy.get('ion-button[id="third-slide-button-right"]').click().end()
})
Cypress.Commands.add('thirdSlideGoLeft', () => {
  cy.get('ion-button[id="third-slide-button-left"]').click().end()
})

// Fourth Slide
Cypress.Commands.add('fourthSlideGoLeft', () => {
  cy.get('ion-button[id="fourth-slide-button-left"]').click().end()
})


// Do Clickable Element
Cypress.Commands.add('doClick', (elementText) => {
  cy.contains(elementText).click().end()
  //cy.wait(1000)
})


/**
 * -------------------------------------------------------------------------
 * CUSTOM COMMAND IMPLEMENTATION
 * -------------------------------------------------------------------------
 */

// Left To Right
Cypress.Commands.add('leftToRight', () => {
  // Left To Right
  cy.firstSlideGoRight()
  cy.wait(1000)
  cy.secondSlideGoRight()
  cy.wait(1000)
  cy.thirdSlideGoRight()
  cy.wait(1000)
})

// Right To Left
Cypress.Commands.add('rightToLeft', () => {
  // Right To Left
  cy.fourthSlideGoLeft()
  cy.wait(1000)
  cy.thirdSlideGoLeft()
  cy.wait(1000)
  cy.secondSlideGoLeft()
  cy.wait(1000)

})

// Accept Data Privacy Agreement
Cypress.Commands.add('acceptAgreement', () => {
  cy.get('ion-toggle[id="acceptCheckBox"]').click()
  cy.doClick("SAVE")
})

// Accept Data Privacy Agreement, Log In then continue
Cypress.Commands.add('acceptAgreementLoginContinue', (alertWindow) => {
  cy.doClick("LOG IN")
  cy.acceptAgreement()
  if (alertWindow) {
    cy.doClick("Okay")
  }
})

Cypress.Commands.add('invalidUserCredential', (alertWindow) => {
  cy.doClick("LOG IN")
  if (alertWindow) {
    cy.doClick("Okay")
  }
})

// Log In
Cypress.Commands.add('login', (userName, password) => {
  cy.get("ion-grid")
  cy.get('ion-input[id="input-username"]')
    .type(userName)
    .should("have.value", userName)
  cy.get('ion-input[id="input-password"]')
    .type(password)
    .should("have.value", password)
  cy.acceptAgreementLoginContinue(false)
  cy.wait(5000)
  cy.contains('Welcome').end()
})

Cypress.Commands.add('loginAndTestDataPrivacy', (userName, password) => {
  cy.get("ion-grid")
  cy.get('ion-input[id="input-username"]')
    .type(userName)
    .should("have.value", userName)
  cy.get('ion-input[id="input-password"]')
    .type(password)
    .should("have.value", password)

  cy.doClick("LOG IN")

  cy.testDataPrivacy()

  cy.wait(5000)
})


// Where Am I
Cypress.Commands.add('whereAmI', (url) => {
  cy.url().should('eq', url)
})

// Navigate Tab Menu
Cypress.Commands.add('navigateTabMenu', (startValue) => {
  var ndx = startValue;
  var i;
  var buttonId = "";
  if (startValue == 0) {
    for (i = ndx; i < tabUrl.length; i++) {
      cy.goToTabMenu(i)
    };
  } else {
    for (i = ndx; i >= 0; i--) {
      cy.goToTabMenu(i)
    };
  }
})

// Goto Tab Menu
Cypress.Commands.add('goToTabMenu', (tabIndex) => {
  var buttonId = "";
  buttonId = 'ion-button[id="' + tabButtonId[tabIndex] + '"]';
  cy.get(buttonId).click()
  // cy.get("[id='button-settings']").click()
  cy.contains(tabMenu[tabIndex]).click()

  // cy.whereAmI(tabUrl[tabIndex])
})

var tabUrl = [dashboardUrl, inpatientsUrl, appointmentsUrl, settingsUrl];

var tabButtonId = ["button-dashboard",
  "button-in-patients",
  "button-appointments",
  "button-settings"
];




// Test In-Patients Detail
Cypress.Commands.add('testInPatientsDetails', (site) => {
  cy.get('body').then(($body => {
    // synchronously query from body
    // to find which element was created
    if ($body.find('h2').length) {
      // p was found, do something else here
      //return 'input'
      cy.get('p').then((el) => {
        switch (site) {
          case "CEBU":
            assert.include(el.text(), "Chong Hua Hospital")
            break;
          case "MANDAUE":
            assert.include(el.text(), "Chong Hua Hospital Mandaue")
            break;
          case "BOTH":
            assert.include(el.text(), "Chong Hua Hospital")
            assert.include(el.text(), "Chong Hua Hospital Mandaue")
        }
      })
    };
  }))
})

/**
 * Test Onboarding Left to Right
 */
Cypress.Commands.add("onboarding", () => {
  cy.get("ion-grid")
  cy.wait(1000)
  // Left To Right
  cy.firstSlideGoRight()
  cy.wait(1000)
  cy.secondSlideGoRight()
  cy.wait(1000)
  cy.thirdSlideGoRight()
  cy.wait(1000)

  cy.doClick("LET'S GO!")
  //cy.doClick("INSTALL")
  cy.wait(1000)
  cy.whereAmI(loginUrl)
})

/**
 * Test Jump to Login from Onboarding
 */
Cypress.Commands.add("jumpToLogin", () => {
  cy.visit(Cypress.env("baseUrlToTest") + Cypress.env("loginUrl"))
  cy.wait(1000)
  // cy.doClick("LET'S GO!")
  //cy.doClick("INSTALL")
  //cy.wait(1000)
  cy.whereAmI(loginUrl)
})

/**
 * Test Data Privacy
 * Updated by: Roberto Pedroza
 * Date Updated: Nov-09-2020
 * Remarks: New
 */
// ===============================================================================
Cypress.Commands.add('testDataPrivacy', () => {
  cy.get('body').then(($body => {
    if ($body.find('[id="acceptCheckBox"]').length > 0) {
      cy.get('ion-toggle[id="acceptCheckBox"]').click()
      cy.doClick("SAVE")
    };
  }))
})

Cypress.Commands.add('testUpdatePassword', (newPassword, confirmPassword1) => {
  /* cy.get('body').then(($body => {
    if ($body.find('ion-input[id="password"]').length) {
      cy.inputNewConfirmPassword(newPassword, confirmPassword)
    };
  })) */

  cy.contains("New Password")
  cy.contains("Confirm Password")

  cy.inputNewConfirmPassword(newPassword, confirmPassword1)
})

Cypress.Commands.add('inputNewConfirmPassword', (newPassword, confirmPassword2) => {
  cy.get("ion-grid")

  cy.wait(500)
  cy.get('ion-input[id="password"]')
    .type(newPassword, { parseSpecialCharSequences: false, delay: 10 })
    .should("have.value", newPassword)

  cy.wait(500)
  cy.get('ion-input[id="confirmPassword"]')
    .type(confirmPassword2, { parseSpecialCharSequences: false }, { delay: 10 })
    .should("have.value", confirmPassword2)

  cy.doClick("SAVE")
})

Cypress.Commands.add('testUpdatePasswordFromSetting', (oldPassword3, newPassword3, confirmPassword3) => {
  /* cy.get('body').then(($body => {
    if ($body.find('ion-input[id="password"]').length) {
      cy.inputNewConfirmPassword(newPassword, confirmPassword)
    };
  })) */

  cy.contains("Current Password")
  cy.contains("New Password")
  cy.contains("Confirm New Password")

  cy.inputNewConfirmPasswordFromSetting(oldPassword3, newPassword3, confirmPassword3)
})

Cypress.Commands.add('inputNewConfirmPasswordFromSetting', (oldPassword3, newPassword3, confirmPassword3) => {
  cy.get("ion-grid")

  cy.wait(500)
  cy.get('ion-input[id="input-password1"]')
    .type(oldPassword3, { parseSpecialCharSequences: false, delay: 10 })
    .should("have.value", oldPassword3)

  cy.wait(500)
  cy.get('ion-input[id="password"]')
    .type(newPassword3, { parseSpecialCharSequences: false, delay: 10 })
    .should("have.value", newPassword3)

  cy.wait(500)
  cy.get('ion-input[id="confirmPassword"]')
    .type(confirmPassword3, { parseSpecialCharSequences: false }, { delay: 10 })
    .should("have.value", confirmPassword3)

  cy.doClick("SAVE")
})

Cypress.Commands.add('cancelChangePassword', (oldPassword4, newPassword4, confirmPassword4) => {
  /* cy.get('body').then(($body => {
    if ($body.find('ion-input[id="password"]').length) {
      cy.inputNewConfirmPassword(newPassword, confirmPassword)
    };
  })) */

  cy.contains("Current Password")
  cy.contains("New Password")
  cy.contains("Confirm New Password")

  cy.inputChangePassword(oldPassword4, newPassword4, confirmPassword4)
})

Cypress.Commands.add('inputChangePassword', (oldPassword4, newPassword4, confirmPassword4) => {
  cy.get("ion-grid")

  cy.wait(500)
  cy.get('ion-input[id="input-password1"]')
    .type(oldPassword4, { parseSpecialCharSequences: false, delay: 10 })
    .should("have.value", oldPassword4)

  cy.wait(500)
  cy.get('ion-input[id="password"]')
    .type(newPassword4, { parseSpecialCharSequences: false, delay: 10 })
    .should("have.value", newPassword4)

  cy.wait(500)
  cy.get('ion-input[id="confirmPassword"]')
    .type(confirmPassword4, { parseSpecialCharSequences: false }, { delay: 10 })
    .should("have.value", confirmPassword4)

  cy.doClick("CANCEL")
})
// ===============================================================================

Cypress.Commands.add('getTestUserAccount', () => {
  var data;
  cy.fixture('testUserAccount').then(function (data) {
    this.data = data;
    return this.getdata;
  })
})

// API
// ==============================================================================
Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length) => {
  return cy.request({
    method: 'GET',
    url: url,
    followRedirect: false,
    headers: {
      'accept': 'application/json'
    }
  })
    .then((response) => {
      // Parse JSON the body.
      let body = JSON.parse(response.body)
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('application/vnd.api+json')
      cy.log(body)
      expect(response.body).to.not.be.null;
      expect(body.data).to.have.length.of.at.least(length)

      // Ensure certain properties are present.
      body.data.forEach(function (item) {
        expect(item).to.have.all.keys('type', 'id', 'attributes', 'relationships', 'links')
        ['changed', 'created', 'default_langcode', 'langcode', 'moderation_state', 'nid', 'path', 'promote', 'revision_log', 'revision_timestamp', 'status', 'sticky', 'title', 'uuid', 'vid'].forEach((key) => {
          expect(item['attributes']).to.have.property(key)
        })
      })
    })

})
// ==============================================================================
Cypress.Commands.add("getDataPW", () => {

  cy.request({
    method: 'PUT',
    url: "http://10.128.18.132/doctorPortalPwa/api/common/Login/Validate",
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      "appCode": "DPP",
      "userName": "50534"
    }
  }).then((response) => {
    return new Promise(resolve => {
      expect(response).property('status').to.equal(200)
      expect(response.body).property('Data').to.not.be.oneOf([null, ""])
      const respBody = response.body;
      const dataPw = respBody['Data'];
      //cy.log(dataPw)
      resolve(dataPw)
    })
  })

})

Cypress.Commands.add("clearThenType", { prevSubject: true }, (subject, text) => {
  cy.wrap(subject).clear().type(text)
}
)

var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl")
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl")
var inpatientsUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsUrl")
var appointmentsUrl = Cypress.env("baseUrlToTest") + Cypress.env("appointmentsUrl")
var settingsUrl = Cypress.env("baseUrlToTest") + Cypress.env("settingsUrl")





/**
 * Dev defined command
 * Updated by: Mark Sibi
 * Date Updated: Apr-12-2022
 * Remarks: New
 */
// ===============================================================================
Cypress.Commands.add('login', (username, password, accept) => {
  cy.get('[name="ion-input-0"]').should("exist").type(username)
  cy.get('[name="ion-input-1"]').should("exist").type(password)

  cy.contains("LOG IN").click()
  cy.wait(1000)

  cy.get('body').then(($body => {
    if ($body.find('[id="acceptCheckBox"]').length > 0) {
      if (accept) {
        cy.get('[id="acceptCheckBox"]').click()
        cy.contains("SAVE").click()
      } else {
        cy.contains("Close").click()
      }

    }
  }))

  if (accept) {
    cy.url({timeout: 30000}).should("include", Cypress.env("inpatientsUrl"))
  } else {
    cy.url({timeout: 30000}).should("include", Cypress.env("loginUrl"))
  }

  cy.wait(2000)
})

Cypress.Commands.add('clicktab', (tabno) => {
  cy.get('[id="button-settings"]').click({ force: true })
  cy.contains(taboptions[tabno]).click({ force: true })

  if (taboptions[tabno] == "Settings")
    cy.url({timeout: 10000}).should("include", Cypress.env("settingsUrl"))

  if (taboptions[tabno] == "Collectibles")
    cy.url({timeout: 10000}).should("include", Cypress.env("collectiblesUrl"))

  if (taboptions[tabno] == "Medical Abstract")
    cy.url({timeout: 10000}).should("include", Cypress.env("medicalAbstractUrl"))

  if (taboptions[tabno] == "Medical Certificate")
    cy.url({timeout: 10000}).should("include", Cypress.env("medicalCertUrl"))
    
  // cy.reload()
})

Cypress.Commands.add('clickmenu', (tabno) => {
  cy.get('[id="' + menuoptions[tabno] + '"]').click({ force: true })

  if (menuoptions[tabno] == "button-dashboard")
    cy.url({timeout: 10000}).should("include", Cypress.env("dashboardUrl"))

  if (menuoptions[tabno] == "button-in-patients")
    cy.url({timeout: 10000}).should("include", Cypress.env("inpatientsUrl"))

  if (menuoptions[tabno] == "button-appointments")
    cy.url({timeout: 10000}).should("include", Cypress.env("newsfeedUrl"))

  
})

var taboptions = ["Collectibles",
  "Medical Abstract",
  "Medical Certificate",
  "Settings"
];

var menuoptions = ["button-dashboard",
  "button-in-patients",
  "button-appointments",
  "button-settings"
];