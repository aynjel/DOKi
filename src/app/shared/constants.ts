import { Injectable } from "@angular/core";

@Injectable()
export class Constants {
  // (A)

  /* Admission Status */
  public ADMISSION_STATUS__CODE__ADMITTED: string = "AC";
  public ADMISSION_STATUS__VALUE__ADMITTED: string = "ADMITTED";
  public ADMISSION_STATUS__CODE__FOR_DISCHARGE: string = "DN";
  public ADMISSION_STATUS__VALUE__FOR_DISCHARGE: string = "FOR DISCHARGE";

  // (B)

  /* Blank Space */
  public BLANK_SPACE: string = " ";

  // (C)

  /* CHH Site */
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

  /* Doctor Service Types */
  public DOCTOR_SERVICE_TYPE__CODE__CO_MANAGE: string = "CM";
  public DOCTOR_SERVICE_TYPE__VALUE__CO_MANAGE: string = "Co-Manage";
  public DOCTOR_SERVICE_TYPE__CODE__PRIMARY_ATTENDING_PHYSICIAN: string = "AP";
  public DOCTOR_SERVICE_TYPE__VALUE__PRIMARY_ATTENDING_PHYSICIAN: string =
    "Primary Attending Physician";
  public DOCTOR_SERVICE_TYPE__CODE__CONSULT: string = "CO";
  public DOCTOR_SERVICE_TYPE__VALUE__CONSULT: string = "Consult";
  public DOCTOR_SERVICE_TYPE__CODE__HMO: string = "HC";
  public DOCTOR_SERVICE_TYPE__VALUE__HMO: string = "HMO";

  // (E)

  /* Empty String, Null, Zero*/
  public STRING__VALUE__EMPTY: string = "";
  public ANY__VALUE__NULL: any = null;
  public NUMBER__VALUE__ZERO: number = 0;

  // (M)

  /* Menu */
  public MENU__VALUE__DASHBOARD: string = "DASHBOARD";
  public MENU__VALUE__IN_PATIENTS: string = "IN-PATIENTS";
  public MENU__VALUE__APPOINTMENTS: string = "APPOINTMENTS";
  public MENU__VALUE__SETTINGS: string = "SETTINGS";
  public MENU__VALUE__LOG_OUT: string = "LOG OUT";

  // (S)

  /* Signal R */
  public SIGNAL_R__VALUE__URL: string = "http://localhost:52080/signalHub";

  // (V)

  /* Version */
  public DOCTOR_PORTAL__VALUE__VERSION: string = "v1.0.1";

  // (W)

  /* Week Days */
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
