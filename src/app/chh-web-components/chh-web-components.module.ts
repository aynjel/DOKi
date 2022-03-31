import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChhAppLogoComponent } from './chh-app-logo/chh-app-logo.component';
import { ChhAppSlidesComponent } from './chh-app-slides/chh-app-slides.component';
import { ChhAppSliderPage } from './chh-app-slider/chh-app-slider.page';
import { ChhAppStartComponent } from './chh-app-start/chh-app-start.component';
import { ChhAppHospitalComponent } from './chh-app-hospital/chh-app-hospital.component';
import { ChhAppTestChemistryComponent } from './chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component';
import { ChhAppTestFecalysisComponent } from './chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component';
import { ChhAppTestSerologyComponent } from './chh-app-test/chh-app-test-serology/chh-app-test-serology.component';
import { ChhAppTestHematologyComponent } from './chh-app-test/chh-app-test-hematology/chh-app-test-hematology.component';
import { ChhAppTestCbcComponent } from './chh-app-test/chh-app-test-cbc/chh-app-test-cbc.component';

import { ChhAppTestUrinalysisComponent } from './chh-app-test/chh-app-test-urinalysis/chh-app-test-urinalysis.component';

import { MandaueLabDetailsComponent } from './chh-app-test/mandaue-lab-details/mandaue-lab-details.component';

import { ChhAppDateSelectorComponent } from './chh-app-date-selector/chh-app-date-selector.component';
import { IonicModule } from '@ionic/angular';
import { ChhAppLogoSmComponent } from './chh-app-logo-sm/chh-app-logo-sm.component';
import { ChhAppHospitalSelectorWithAllComponent } from './chh-app-hospital-selector-with-all/chh-app-hospital-selector-with-all.component';
import { ChhAppTextAvatarModule } from './chh-app-text-avatar/chh-app-text-avatar.module';

import { ChhAppCardNewlineComponent } from './chh-app-card-newline/chh-app-card-newline.component';
import { ChhAppListOfDoctorsComponent } from './chh-app-list-of-doctors/chh-app-list-of-doctors.component';
import { ChhAppDesktopNavigationComponent } from './chh-app-desktop-navigation/chh-app-desktop-navigation.component';
import { ChhAppPatientHeaderComponent } from './chh-app-patient-header/chh-app-patient-header.component';

import { ChhAppAdmittingDiagnosisComponent } from './chh-app-admitting-diagnosis/chh-app-admitting-diagnosis.component';

import { ChhAppFinalDiagnosisComponent } from './chh-app-final-diagnosis/chh-app-final-diagnosis.component';

import { ChhAppInsuranceCoordinatorInquiryComponent } from './chh-app-insurance-coordinator-inquiry/chh-app-insurance-coordinator-inquiry.component';

import { ChhAppIsPatientSeenComponent } from './chh-app-is-patient-seen/chh-app-is-patient-seen.component';

import { ChhAppCaseratesComponent } from './chh-app-caserates/chh-app-caserates.component';
import { ChhAppNewsfeedComponent } from './chh-app-newsfeed/chh-app-newsfeed.component';

import { ChhAppForgotPasswordComponent } from './chh-app-forgot-password/chh-app-forgot-password.component';
import { ChhAppExecutiveDeptComponent } from './chh-app-executive-dept/chh-app-executive-dept.component';

import { PatientdetailComponent } from '../pages/executuve/components/patientdetail/patientdetail.component';
import { DoctordetailComponent } from '../pages/executuve/components/doctordetail/doctordetail.component';
import { DashboardgraphComponent } from '../pages/executuve/components/dashboardgraph/dashboardgraph.component';
import { CvdbreakdownComponent } from '../pages/executuve/components/cvdbreakdown/cvdbreakdown.component';

import { DoctordirectorydetailComponent } from '../pages/executuve/components/doctordirectorydetail/doctordirectorydetail.component';
import { CardshowhideComponent } from '../chh-web-components/cardshowhide/cardshowhide.component';
import { ProgressnotesHistoryComponent } from './progressnotes-history/progressnotes-history.component';
import { ProgressnotesHistoryCardComponent } from './progressnotes-history-card/progressnotes-history-card.component';
import { CollectiblesPreviewComponent } from './collectibles-preview/collectibles-preview.component';
@NgModule({
  declarations: [
    ChhAppLogoComponent,
    ChhAppSlidesComponent,
    ChhAppStartComponent,
    ChhAppHospitalComponent,
    ChhAppHospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    ChhAppLogoSmComponent,
    ChhAppSliderPage,
    ChhAppTestChemistryComponent,
    ChhAppTestFecalysisComponent,
    ChhAppTestSerologyComponent,
    ChhAppTestHematologyComponent,
    ChhAppTestCbcComponent,
    ChhAppTestUrinalysisComponent,
    ChhAppCardNewlineComponent,
    ChhAppPatientHeaderComponent,
    ChhAppListOfDoctorsComponent,
    ChhAppDesktopNavigationComponent,
    ChhAppAdmittingDiagnosisComponent,
    ChhAppFinalDiagnosisComponent,
    ChhAppInsuranceCoordinatorInquiryComponent,
    ChhAppIsPatientSeenComponent,
    MandaueLabDetailsComponent,
    ChhAppCaseratesComponent,
    ChhAppNewsfeedComponent,
    ChhAppForgotPasswordComponent,
    ChhAppExecutiveDeptComponent,
    PatientdetailComponent,
    DoctordetailComponent,
    DashboardgraphComponent,
    CvdbreakdownComponent,
    DoctordirectorydetailComponent,
    CardshowhideComponent,
    ProgressnotesHistoryComponent,
    ProgressnotesHistoryCardComponent,
    CollectiblesPreviewComponent,
  ],
  exports: [
    ChhAppLogoComponent,
    ChhAppSlidesComponent,
    ChhAppStartComponent,
    ChhAppHospitalComponent,
    ChhAppHospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    ChhAppLogoSmComponent,
    ChhAppSliderPage,
    ChhAppTestChemistryComponent,
    ChhAppTestFecalysisComponent,
    ChhAppTestSerologyComponent,
    ChhAppTestHematologyComponent,
    ChhAppTestCbcComponent,
    ChhAppTestUrinalysisComponent,
    ChhAppCardNewlineComponent,
    ChhAppPatientHeaderComponent,
    ChhAppListOfDoctorsComponent,
    ChhAppDesktopNavigationComponent,
    ChhAppAdmittingDiagnosisComponent,
    ChhAppFinalDiagnosisComponent,
    ChhAppInsuranceCoordinatorInquiryComponent,
    ChhAppIsPatientSeenComponent,
    MandaueLabDetailsComponent,
    ChhAppCaseratesComponent,
    ChhAppNewsfeedComponent,
    ChhAppForgotPasswordComponent,
    ChhAppExecutiveDeptComponent,
    PatientdetailComponent,
    DoctordetailComponent,
    DashboardgraphComponent,
    CvdbreakdownComponent,
    DoctordirectorydetailComponent,
    CardshowhideComponent,
    ProgressnotesHistoryComponent,
    ProgressnotesHistoryCardComponent,
    CollectiblesPreviewComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ChhAppTextAvatarModule,
    RouterModule,
    FormsModule,
  ],
})
export class ChhWebComponentsModule {}
