import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { HomeGuard } from "../guards/home.guard";
import { UserDataResolver } from "../resolvers/userData.resolver";
const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver,
    },
    children: [
      {
        path: "in-patients",
        loadChildren: () =>
          import("../tab-in-patients/tab-in-patients.module").then(
            (m) => m.TabInPatientsPageModule
          ),
      },
      {
        path: "in-patients/DN",
        loadChildren: () =>
          import("../tab-in-patients/tab-in-patients.module").then(
            (m) => m.TabInPatientsPageModule
          ),
      },
      {
        path: "in-patients/AC",
        loadChildren: () =>
          import("../tab-in-patients/tab-in-patients.module").then(
            (m) => m.TabInPatientsPageModule
          ),
      },
      /*
      {
        path: 'appointments',
        loadChildren: () =>
          import('../tab-appointments/tab-appointments.module').then(
            (m) => m.TabAppointmentsPageModule
          ),
      },*/
      {
        path: "settings",
        loadChildren: () =>
          import("../tab-settings/tab-settings.module").then(
            (m) => m.TabSettingsPageModule
          ),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("../tab-dashboard/tab-dashboard.module").then(
            (m) => m.TabDashboardPageModule
          ),
      },
      {
        path: "news-feed",
        loadChildren: () =>
          import("../tab-news-feed/tab-news-feed.module").then(
            (m) => m.TabNewsFeedPageModule
          ),
      },
      {
        path: "in-patients/:id/progressnotes",
        loadChildren: () =>
          import(
            "../pages/in-patient-patient-information/progress-notes/progress-notes.module"
          ).then((m) => m.ProgressNotesPageModule),
      },
      {
        path: "in-patients/:id/diagnostic-results",
        loadChildren: () =>
          import(
            "../pages/in-patient-patient-information/diagnostic-results/diagnostic-results.module"
          ).then((m) => m.DiagnosticResultsPageModule),
      },
      {
        path: "inbox",
        loadChildren: () =>
          import("../pages/doctors-information/inbox/inbox.module").then(
            (m) => m.InboxPageModule
          ),
      },
      {
        path: "patient-history",
        loadChildren: () =>
          import(
            "../pages/in-patient-patient-information/patient-history/patient-history.module"
          ).then((m) => m.PatientHistoryPageModule),
      },
      {
        path: "search-Medical-Abstract",
        loadChildren: () =>
          import(
            "../pages/doctors-information/search-medicalabstract/search-medicalabstract.module"
          ).then((m) => m.SearchMedicalabstractPageModule),
      },
      {
        path: "inbox/sign-medabs/:pNo/:admissionNo/:ctr",
        loadChildren: () =>
          import(
            "../pages/doctors-information/sign-medicalabstract/sign-medicalabstract.module"
          ).then((m) => m.SignMedicalabstractPageModule),
      },
      {
        path: "patient-history/patient-details/:id",
        loadChildren: () =>
          import(
            "../pages/in-patient-patient-information/patient-history-patient-detail/patient-history-patient-detail.module"
          ).then((m) => m.PatientHistoryPatientDetailPageModule),
      },
      {
        path: "in-patients/:admissionNo/viewAndCancel/:dischargeNo",
        loadChildren: () =>
          import(
            "../pages/doctors-information/view-medcert1/view-medcert1.module"
          ).then((m) => m.ViewMedcert1PageModule),
      },
      {
        path: "inbox/sign-medcert/:admissionNo/:dischargeNo",
        loadChildren: () =>
          import(
            "../pages/doctors-information/sign-medcert/sign-medcert.module"
          ).then((m) => m.SignMedcertPageModule),
      },
      {
        path: "help",
        loadChildren: () =>
          import("../pages/others/help/help.module").then(
            (m) => m.HelpPageModule
          ),
      },
      {
        path: "case-rates",
        loadChildren: () =>
          import("../pages/executuve/tab-caserates/tab-caserates.module").then(
            (m) => m.TabCaseratesPageModule
          ),
      },
      /*
      {
        path: 'collectibles',
        loadChildren: () =>
          import(
            '../pages/doctors-information/collectibles/collectibles.module'
          ).then((m) => m.CollectiblesPageModule),
      },
      {
        path: 'medical-abstract',
        loadChildren: () =>
          import(
            '../pages/doctors-information/medical-abstract/medical-abstract.module'
          ).then((m) => m.MedicalAbstractPageModule),
      },
      {
        path: 'medical-certificate',
        loadChildren: () =>
          import(
            '../pages/doctors-information/medical-certificate/medical-certificate.module'
          ).then((m) => m.MedicalCertificatePageModule),
      },*/

      {
        path: "",
        redirectTo: "/menu/dashboard",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "menu",
    redirectTo: "/menu/tab-in-patients",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
