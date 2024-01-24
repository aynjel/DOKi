import { Injectable } from '@angular/core';
import { LiteralExpr } from '@angular/compiler';

export class DoctorHistoryModel {
  drCode: any;
  accountNo: any;
  mode: any;
}

export class ErpatientModelErpatients {
  drCode: any;
  accountNo: any;
  mode: any;
}

export class InpatientModelInpatients {
  drCode: any;
  accountNo: any;
  mode: any;
}
export class InpatientDetails {
  admission_no: any;
}

export class ErpatientModelInpatients {
  drCode: any;
  accountNo: any;
  mode: any;
}
export class ErpatientDetails {
  admission_no: any;
}
export class DoctorDetails {
  doctorCode: any;
}
export class UserSettingsModel {
  username: any;
  userReference: any;
  appCode: any;
  setting: any;
  property: any;
  value: any;
  mode: any;
}

export class UserSettingDeletesModel {
  username: any;
  userReference: any;
  appCode: any;
  setting: any;
  mode: any;
}
export class ProfileExpiry {
  drCode: any;
  mode: any;
}
export class LoginModelv3 {
  userNameOrEmail: any;
  password: any;
}

export class LoginResponseModelv3 {
  appCode: any;
  appUserStatus: any;
  birthDate: any;
  doctorCode: any;
  first_name: any;
  email: any;
  firstName: any;
  hl: any;
  isAuthenticated: any;
  isDefaultPasswordChanged: any;
  jwt: any;
  lastName: any;
  licenseNo: any;
  phicNo: any;
  deptCode: any;
  aliasEnabled: any;
  alias: any;
  message: any;
  middleName: any;
  mobileNo: any;
  mode: any;
  refreshTokenExpiration: any;
  roles: any;
  site: any;
  status: any;
  userName: any;
  prcExpiryDate: any;
  prcRemainingDays: any;
  phicExpiryDate: any;
  phicRemainingDays: any;
}

export class UserSettingsModelv3 {
  smsNotification: any;
  pushNotification: any;
  darkmode: any;
  privacyPolicy: any;
  pfNotificationForBilling: any;
  pfNotificationForUser: any;
  billingContactCebu: any;
  billingContactMandaue: any;
  smsGatewayCHH: any;
  smsGatewaySmart: any;
}

export class RevokeTokenV3 {
  jwt: any;
}
export class ForgotPasswordV3 {
  email: any;
  doctorCode: any;
  clientURI: any;
}
export class ResetPasswordV3 {
  password: any;
  confirmPassword: any;
  email: any;
  token: any;
}
export class AppSettingsModelv3 {
  smsNotification: any;
  pushNotification: any;
  darkmode: any;
  privacyPolicy: any;
  pfNotificationForBilling: any;
  pfNotificationForUser: any;
  billingContactCebu: any;
  billingContactMandaue: any;
  smsGatewayCHH: any;
  smsGatewaySmart: any;
}

export class NewsFeed {
  id: any;
  title: any;
  contentShortDesc: any;
  contentLongDesc: any;
  imageUrl: any;
  visibility: any;
  targetDeptCode: any;
  targetUsername: any;
  postFromDate: any;
  postToDate: any;
  createdDateTime: any;
  createdBy: any;
  createdByReference: any;
}
export class PatientDetail {
  doctorCode: any;
  admissionNo: any;
}

export class SignatureApproval {
  mode: string;
  account_no: string;
  medcert_comment: string;
  medcert_approve_by: string;
  medcert_signature: string;
}
