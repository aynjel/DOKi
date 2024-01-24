import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ChhAppLogoComponent } from "./chh-app-logo/chh-app-logo.component";
import { ChhAppSlidesComponent } from "./chh-app-slides/chh-app-slides.component";
import { ChhAppSliderPage } from "./chh-app-slider/chh-app-slider.page";
import { ChhAppStartComponent } from "./chh-app-start/chh-app-start.component";
import { ChhAppHospitalComponent } from "./chh-app-hospital/chh-app-hospital.component";
import { ChhAppTestChemistryComponent } from "./chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component";
import { ChhAppTestFecalysisComponent } from "./chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component";
import { ChhAppTestSerologyComponent } from "./chh-app-test/chh-app-test-serology/chh-app-test-serology.component";
import { ChhAppTestHematologyComponent } from "./chh-app-test/chh-app-test-hematology/chh-app-test-hematology.component";
import { ChhAppTestCbcComponent } from "./chh-app-test/chh-app-test-cbc/chh-app-test-cbc.component";

import { ChhAppTestUrinalysisComponent } from "./chh-app-test/chh-app-test-urinalysis/chh-app-test-urinalysis.component";

import { MandaueLabDetailsComponent } from "./chh-app-test/mandaue-lab-details/mandaue-lab-details.component";

import { ChhAppDateSelectorComponent } from "./chh-app-date-selector/chh-app-date-selector.component";
import { IonicModule } from "@ionic/angular";
import { ChhAppLogoSmComponent } from "./chh-app-logo-sm/chh-app-logo-sm.component";
import { ChhAppHospitalSelectorWithAllComponent } from "./chh-app-hospital-selector-with-all/chh-app-hospital-selector-with-all.component";
import { ChhAppTextAvatarModule } from "./chh-app-text-avatar/chh-app-text-avatar.module";

import { ChhAppCardNewlineComponent } from "./chh-app-card-newline/chh-app-card-newline.component";
import { ChhAppListOfDoctorsComponent } from "./chh-app-list-of-doctors/chh-app-list-of-doctors.component";
import { ChhAppDesktopNavigationComponent } from "./chh-app-desktop-navigation/chh-app-desktop-navigation.component";
import { ChhAppPatientHeaderComponent } from "./chh-app-patient-header/chh-app-patient-header.component";

import { ChhAppAdmittingDiagnosisComponent } from "./chh-app-admitting-diagnosis/chh-app-admitting-diagnosis.component";

import { ChhAppFinalDiagnosisComponent } from "./chh-app-final-diagnosis/chh-app-final-diagnosis.component";

import { ChhAppInsuranceCoordinatorInquiryComponent } from "./chh-app-insurance-coordinator-inquiry/chh-app-insurance-coordinator-inquiry.component";

import { ChhAppIsPatientSeenComponent } from "./chh-app-is-patient-seen/chh-app-is-patient-seen.component";

import { ChhAppCaseratesComponent } from "./chh-app-caserates/chh-app-caserates.component";
import { ChhAppNewsfeedComponent } from "./chh-app-newsfeed/chh-app-newsfeed.component";

import { ChhAppForgotPasswordComponent } from "./chh-app-forgot-password/chh-app-forgot-password.component";
import { ChhAppExecutiveDeptComponent } from "./chh-app-executive-dept/chh-app-executive-dept.component";

import { PatientdetailComponent } from "../pages/executuve/components/patientdetail/patientdetail.component";
import { DoctordetailComponent } from "../pages/executuve/components/doctordetail/doctordetail.component";
import { DashboardgraphComponent } from "../pages/executuve/components/dashboardgraph/dashboardgraph.component";
import { CvdbreakdownComponent } from "../pages/executuve/components/cvdbreakdown/cvdbreakdown.component";

import { DoctordirectorydetailComponent } from "../pages/executuve/components/doctordirectorydetail/doctordirectorydetail.component";
import { CardshowhideComponent } from "../chh-web-components/cardshowhide/cardshowhide.component";
import { ProgressnotesHistoryComponent } from "./progressnotes-history/progressnotes-history.component";
import { ProgressnotesHistoryCardComponent } from "./progressnotes-history-card/progressnotes-history-card.component";
import { CollectiblesPreviewComponent } from "./collectibles-preview/collectibles-preview.component";
import { UploadComponent } from "./upload/upload.component";
import { ProfessionalFeeSummaryTextsComponent } from "./professional-fee-summary-texts/professional-fee-summary-texts.component";
import { ProfessionalFeeSummaryPatientInfoComponent } from "./professional-fee-summary-patient-info/professional-fee-summary-patient-info.component";
import { ProfessionalFeeHelperComponent } from "./professional-fee-helper/professional-fee-helper.component";
import { PinchZoomModule } from "ngx-pinch-zoom";
import { ChhAppResiProgressNotesComponent } from "./chh-app-resi-progress-notes/chh-app-resi-progress-notes.component";
import { PatientNameComponent } from "./patient-name/patient-name.component";
import { SoapShowHideComponent } from "./soap-show-hide/soap-show-hide.component";
import { ApprovePopOverComponent } from "./approve-pop-over/approve-pop-over.component";
import { ViewCommentsPopOverComponent } from "./view-comments-pop-over/view-comments-pop-over.component";
import { ChatNewMessageComponent } from "./chat-new-message/chat-new-message.component";
import { ShowHideComponent } from "./show-hide/show-hide.component";
import { Loading1Component } from "./loading1/loading1.component";
import { ExamResultsModalComponent } from "./exam-results-modal/exam-results-modal.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { PrognotesheadviewComponent } from "./prognotesheadview/prognotesheadview.component";
import { SoapHandlerComponent } from "./soap-handler/soap-handler.component";
import { SoapShowHide2Component } from "./soap-show-hide2/soap-show-hide2.component";
import { RevisionComponent } from "../pages/doctors-information/sign-medicalabstract/components/revision/revision.component";
import { Revision1Component } from "../pages/doctors-information/discharge-instruction/components/revision1/revision1.component";
import { Revision1HistoryComponent } from "../pages/doctors-information/discharge-instruction/components/revision1-history/revision1-history.component";
import { ChhAppChiefComplaintComponent } from "./chh-app-chief-complaint/chh-app-chief-complaint.component";
import { ChhAppPatientEmosHeaderComponent } from "./chh-app-patient-emos-header/chh-app-patient-emos-header.component";
import { ProfessionalFeeErSummaryPatientInfoComponent } from "./professional-fee-er-summary-patient-info/professional-fee-er-summary-patient-info.component";
import { ChhAppHospitalSelectorWithAllAndFilterEdComponent } from "./chh-app-hospital-selector-with-all-and-filter-ed/chh-app-hospital-selector-with-all-and-filter-ed.component";

@NgModule({
  declarations: [
    Revision1Component,
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
    UploadComponent,
    ProfessionalFeeSummaryTextsComponent,
    ProfessionalFeeSummaryPatientInfoComponent,
    ProfessionalFeeHelperComponent,
    ChhAppResiProgressNotesComponent,
    PatientNameComponent,
    SoapShowHideComponent,
    ApprovePopOverComponent,
    ViewCommentsPopOverComponent,
    ChatNewMessageComponent,
    ShowHideComponent,
    Loading1Component,
    ExamResultsModalComponent,
    PrognotesheadviewComponent,
    SoapHandlerComponent,
    SoapShowHide2Component,
    RevisionComponent,
    Revision1HistoryComponent,
    ChhAppChiefComplaintComponent,
    ChhAppPatientEmosHeaderComponent,
    ProfessionalFeeErSummaryPatientInfoComponent,
    ChhAppHospitalSelectorWithAllAndFilterEdComponent
  ],
  exports: [
    Revision1HistoryComponent,
    ChhAppLogoComponent,
    RevisionComponent,
    Revision1Component,
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
    UploadComponent,
    ProfessionalFeeSummaryTextsComponent,
    ProfessionalFeeSummaryPatientInfoComponent,
    ProfessionalFeeHelperComponent,
    ChhAppResiProgressNotesComponent,
    PatientNameComponent,
    SoapShowHideComponent,
    ApprovePopOverComponent,
    ViewCommentsPopOverComponent,
    ChatNewMessageComponent,
    ShowHideComponent,
    Loading1Component,
    ExamResultsModalComponent,
    PrognotesheadviewComponent,
    SoapHandlerComponent,
    SoapShowHide2Component,
    ChhAppChiefComplaintComponent,
    ChhAppPatientEmosHeaderComponent,
    ProfessionalFeeErSummaryPatientInfoComponent,
    ChhAppHospitalSelectorWithAllAndFilterEdComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ChhAppTextAvatarModule,
    RouterModule,
    FormsModule,
    PinchZoomModule,
    PdfViewerModule,
  ],
})
export class ChhWebComponentsModule {}
