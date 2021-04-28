var loginUrl = Cypress.env("baseUrlToTest") + Cypress.env("loginUrl");
var dashboardUrl = Cypress.env("baseUrlToTest") + Cypress.env("dashboardUrl");
var inpatientsUrl = Cypress.env("baseUrlToTest") + Cypress.env("inpatientsUrl");
var userAccount;
var doctorPfData;

context("Actions", () => {
  context("6A - Professional Fee", () => {
    beforeEach(() => {

      // Load Test Data
      // -------------------------------------------------
      cy.fixture('testUserAccount').then(function (data) {
        userAccount = data;
        });
      
      cy.fixture('testProfessionalFee').then(function (data1) {
        doctorPfData = data1;
        });
      // --------------------------------------------------

      //cy.jumpToLogin();
    });

    /**
    * December 14, 2020
    */
   
     it("Test Scenario 1 - Initialize Test Data.", () => {
      cy.request('DELETE', doctorPfData.initData);
      cy.wait(2000);
      cy.end();
   });
    
    /**
    * December 14, 2020
    */
       it("Test Scenario 2 - Entry Professional Fee.", () => {
          cy.jumpToLogin();
          cy.wait(3000);
         // 1 - LOGIN
          cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
          cy.wait(1000);
          cy.whereAmI(dashboardUrl);

          // 2 - CLICK IN-PATIENTS TAB
          cy.goToTabMenu(1);
          cy.wait(1000);
          cy.whereAmI(inpatientsUrl);

          // 3 - SELECT ITEM
          cy.doClick(doctorPfData.doctorName);
          cy.wait(1000);
          cy.contains("Patient Information");
          //cy.contains("UPDATE");

          // 4 - CLICK UPDATE BUTTON
          cy.doClick("UPDATE");
          cy.contains("Professional Fee");

          // 5 - INPUT PROFESSIONAL FEE / REMARKS
          cy.get("ion-item");

          cy.wait(500);
          cy.get('ion-input[id="input-professionalFee"]')
          .type(doctorPfData.pf, {parseSpecialCharSequences:false, delay:10})
          .should("have.value", doctorPfData.pf);

          cy.wait(500);
          cy.get('ion-textarea[id="input-remarks"]')
          .type(doctorPfData.remarks, {parseSpecialCharSequences:false, delay:10})
          .should("have.value", doctorPfData.remarks);
 
           // 10 - CLICK SAVE & YES BUTTON
           cy.doClick("SAVE");
           cy.doClick("Yes.");
           cy.wait(2000);
           cy.contains("SUCCESS");
           cy.doClick("Okay");
          
           cy.wait(2000);
           cy.doClick(doctorPfData.doctorName);
           cy.wait(2000);
           cy.contains("Patient Information");
           cy.contains("UPDATE");
           cy.contains(doctorPfData.pf);
           cy.contains(doctorPfData.remarks);

           //cy.contains("Close").click(); 
           cy.end();
    });
 
    /**
    * December 15, 2020
    */
       it("Test Scenario 3 - Update Professional Fee.", () => {
         cy.jumpToLogin();
         cy.wait(3000);
        // 1 - LOGIN
        cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
        cy.wait(1000);
        cy.whereAmI(dashboardUrl);

        // 2 - CLICK IN-PATIENTS TAB
        cy.goToTabMenu(1);
        cy.wait(1000);
        cy.whereAmI(inpatientsUrl);

        // 3 - SELECT ITEM
        cy.doClick(doctorPfData.doctorName);
        cy.contains("Patient Information");
        cy.contains("UPDATE");

        // 4 - CLICK UPDATE BUTTON
        cy.doClick("UPDATE"); 
        cy.contains("Professional Fee");

        // 5 - MODIFY PROFESIONAL FEE AND REMARKS
        cy.get("ion-item");
        cy.get('ion-textarea[id="input-remarks"]').click().dblclick();
        cy.get('body').tab();
         cy.wait(2000);
       cy.get('ion-input[id="input-professionalFee"]').focused().clear()
        .type(doctorPfData.newPf, {parseSpecialCharSequences:false, delay:10})
        .should("have.value", doctorPfData.newPf);

        cy.get('ion-textarea[id="input-remarks"]').click().dblclick();
        cy.get('body').tab();
        cy.focused().tab();
        cy.wait(2000);
        cy.get('ion-textarea[id="input-remarks"]')
        .type(doctorPfData.newRemarks, {parseSpecialCharSequences:false, delay:10})
        .should("have.value", doctorPfData.newRemarks);
        cy.get('body').tab();

         // 10 - CLICK SAVE & YES BUTTON
         cy.doClick("SAVE");
         cy.wait(500);
         cy.doClick("Yes.");
         cy.wait(2000);
         cy.contains("SUCCESS");
         cy.doClick("Okay");
         cy.wait(2000);

         cy.doClick(doctorPfData.doctorName);
         cy.wait(2000);
         cy.contains("Patient Information");
         cy.contains("UPDATE");
         cy.contains(doctorPfData.newPf); // NEW PF
         cy.contains(doctorPfData.newRemarks); // NEW PF

         //cy.contains("Close").click();
         cy.end();
    });
 
    /**
    * December 15, 2020
    */
  
     it("Test Scenario 4 - Delete Professional Fee.", () => {
         cy.jumpToLogin();
        // 1 - LOGIN
        cy.loginAndTestDataPrivacy(userAccount[0].userName,userAccount[0].password);
        cy.wait(1000);
        cy.whereAmI(dashboardUrl);

        // 2 - CLICK IN-PATIENTS TAB
        cy.goToTabMenu(1);
        cy.wait(1000);
        cy.whereAmI(inpatientsUrl);

        // 3 - SELECT ITEM
        cy.doClick(doctorPfData.doctorName);
        cy.contains("Patient Information");
        cy.contains("UPDATE");

        // 4 - CLICK UPDATE BUTTON
        cy.doClick("UPDATE"); 
        cy.contains("Professional Fee");

        // 5 - MODIFY PROFESIONAL FEE AND REMARKS
        cy.get('ion-input[id="input-professionalFee"]').click().dblclick();
        cy.focused();
         cy.get('ion-input[id="input-professionalFee"]').focused().clear()
        .type(doctorPfData.deletePf, {parseSpecialCharSequences:false, delay:10})
        .should("have.value", doctorPfData.deletePf); 

        //cy.get('ion-textarea[id="input-remarks"]').click().dblclick();
        //cy.get('body').tab();
        //cy.focused().tab();
        //cy.get('ion-textarea[id="input-remarks"]')
        //.type("", {parseSpecialCharSequences:false, delay:10})
        //.should("have.value", "");
        //cy.get('body').tab(); 

         // 10 - CLICK SAVE & YES BUTTON
         cy.doClick("SAVE");
         cy.wait(500);
         cy.doClick("Yes.");
         cy.contains("SUCCESS");
         cy.doClick("Okay");
         cy.wait(1000);

         cy.doClick(doctorPfData.doctorName);
         cy.wait(2000);
         cy.contains("Patient Information");
         cy.contains("UPDATE");
         //cy.contains(doctorPfData.newPf); // NEW PF
         //cy.contains(doctorPfData.newRemarks); // NEW PF

         //cy.contains("Close").click();
         cy.end();
    });

});

});
