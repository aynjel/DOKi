import { Injectable } from "@angular/core";

@Injectable()
export class Constants {

  // (A)
  /**
   * Admission Status
   */
  public ADMISSION_STATUS__CODE__ADMITTED: string = "AC";
  public ADMISSION_STATUS__VALUE__ADMITTED: string = "ADMITTED";
  public ADMISSION_STATUS__CODE__FOR_DISCHARGE: string = "DN";
  public ADMISSION_STATUS__VALUE__FOR_DISCHARGE: string = "FOR DISCHARGE";
  public ADMISSION_STATUS_SELECTION__VALUE__ALL: string = "ALL"

  /**
   * Appointment Status
   */
  public APPOINTMENT_STATUS__VALUE__COMPLETE: string = "Complete";
  public APPOINTMENT_STATUS__VALUE__WAITING: string = "Waiting";
  public APPOINTMENT_STATUS__VALUE__SERVING: string = "Serving";
  public APPOINTMENT_STATUS__VALUE__RESERVED: string = "Reserved";

  // (B)
  /**
   *  Blank Space
   */
  public BLANK_SPACE: string = " ";

  // (C)
  /**
   * CHH Site
   */
  public CHH_SITE__CODE__CEBU: string = "C";
  public CHH_SITE__VALUE__CEBU: string = "CHHC";
  public CHH_SITE__CODE__MANDAUE: string = "M";
  public CHH_SITE__VALUE__MANDAUE: string = "CHHM";
  public CHH_SITE__CODE__ALL: string = "A";
  public CHH_SITE__VALUE__ALL: string = "ALL";
  public CHH_NAME__VALUE__CEBU: string = "Chong Hua Hospital";
  public CHH_NAME__VALUE__MANDAUE: string = "Chong Hua Hospital Mandaue";
  public CHH_LABEL__VALUE__CEBU: string = "CEBU";
  public CHH_LABEL__VALUE__MANDAUE: string = "MANDAUE";
  public CHH_LABEL__VALUE__BOTH: string = "BOTH";
  
  // (D)
  /**
   * Doctor Service Types
   */
  public DOCTOR_SERVICE_TYPE__CODE__CO_MANAGE: string = "CM";
  public DOCTOR_SERVICE_TYPE__VALUE__CO_MANAGE: string = "Co-Manage";
  public DOCTOR_SERVICE_TYPE__CODE__PRIMARY_ATTENDING_PHYSICIAN: string = "AP";
  public DOCTOR_SERVICE_TYPE__VALUE__PRIMARY_ATTENDING_PHYSICIAN: string =
    "Primary Attending Physician";
  public DOCTOR_SERVICE_TYPE__CODE__CONSULT: string = "CO";
  public DOCTOR_SERVICE_TYPE__VALUE__CONSULT: string = "Consult";
  public DOCTOR_SERVICE_TYPE__CODE__HMO: string = "HC";
  public DOCTOR_SERVICE_TYPE__VALUE__HMO: string = "HMO";

   /**
   * Doctor Professional Fee
   */
  public DOCTOR__CODE__PROFESSIONAL_FEE: string = "PF";
  public DOCTOR__VALUE__PROFESSIONAL_FEE: string = "Professional Fee";

  // (E)
  /**
   * Empty String, Null, Zero
   */
  public STRING__VALUE__EMPTY: string = "";
  public ANY__VALUE__NULL: any = null;
  public NUMBER__VALUE__ZERO: number = 0;

  // (M)
  /**
   * Menu
   */
  public MENU__VALUE__DASHBOARD: string = "Dashboard";
  public MENU__VALUE__IN_PATIENTS: string = "In-Patients";
  public MENU__VALUE__APPOINTMENTS: string = "Appointments";
  public MENU__VALUE__SETTINGS: string = "Settings";
  public MENU__VALUE__LOG_OUT: string = "Log Out";

  // (N)
  /**
   * Name Prefix
   */
  public NAME_PREFIX__CODE__DOCTOR: string = "Dr.";
  public NAME_PREFIX__VALUE__DOCTOR: string = "Doctor";

  // (P)
  /**
   * 
   */
 
  // (S)
  /**
   * SignalR URL
   */
  public SIGNAL_R__VALUE__URL: string = "http://localhost:52080/signalHub";

   // (U)
   /**
   * UI Component Text
   */
  public UI_COMPONENT_TEXT__VALUE__UPDATE: string = "Update";
  public UI_COMPONENT_TEXT__VALUE__DELETE: string = "Delete";
  public UI_COMPONENT_TEXT__VALUE__CANCEL: string = "Cancel";
  public UI_COMPONENT_TEXT__VALUE__OKAY: string = "Okay";
  public UI_COMPONENT_TEXT__VALUE__LOGIN: string = "Log In";


  /**
   * UI Component Text - Settings 
   */
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_NOTIFICATIONS: string = "Notifications";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_SMS_NOTIFICATIONS_ADMITTED: string = "Notify me via SMS if my patient is admitted";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_SMS_NOTIFICATIONS_FOR_DISCHARGE: string = "Notify me via SMS if my patient is about to be discharged";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_PUSH_NOTIFICATIONS: string = "Alert me through Push Notifications";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_APPEARANCE: string = "Appearance";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_APPEARANCE_DARK_MODE: string = "Switch to Dark Mode";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_INFO: string = "For inquiries, please contact Systems Solution & Business Intelligence Team of Chong Hua Hospital IT Division";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_INFO_TELEPHONE: string = "+63 32 233 8000";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_INFO_TELEPHONE_HREF: string = "tel: +63322338000";
  public UI_COMPONENT_TEXT__VALUE__SETTINGS_INFO_APP_VERSION: string = "App Version:";

  /**
   * UI Component Text - Login
   */
  public UI_COMPONENT_TEXT__VALUE__LOGIN_GREETINGS: string = "Hello, Doc!";
  public UI_COMPONENT_TEXT__VALUE__LOGIN_USERNAME: string = "Username";
  public UI_COMPONENT_TEXT__VALUE__LOGIN_PASSWORD: string = "Password";
  
  // (V)
  /**
   * Version
   */
  public DOCTOR_PORTAL__VALUE__VERSION: string = "v1.1.3";

  // (W)
  /**
   * Week Days
   */
  public WEEK_DAY__CODE__SUNDAY: number = 0;
  public WEEK_DAY__VALUE__SUNDAY: string = "SUNDAY";
  public WEEK_DAY__CODE__MONDAY: number = 1;
  public WEEK_DAY__VALUE__MONDAY: string = "MONDAY";
  public WEEK_DAY__CODE__TUESDAY: number = 2;
  public WEEK_DAY__VALUE__TUESDAY: string = "TUESDAY";
  public WEEK_DAY__CODE__WEDNESDAY: number = 3;
  public WEEK_DAY__VALUE__WEDNESDAY: string = "WEDNESDAY";
  public WEEK_DAY__CODE__THURSDAY: number = 4;
  public WEEK_DAY__VALUE__THURSDAY: string = "THURSDAY";
  public WEEK_DAY__CODE__FRIDAY: number = 5;
  public WEEK_DAY__VALUE__FRIDAY: string = "FRIDAY";
  public WEEK_DAY__CODE__SATURDAY: number = 6;
  public WEEK_DAY__VALUE__SATURDAY: string = "SATURDAY";
}
