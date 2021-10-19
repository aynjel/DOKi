import { Injectable } from '@angular/core'
import { LiteralExpr } from '@angular/compiler'

export class DoctorHistoryModel{
    drCode: any
    accountNo: any
    mode: any
}

export class InpatientModelInpatients{
    drCode: any
    accountNo: any
    mode: any
}

export class UserSettingsModel{
    username: any
    userReference: any
    appCode: any
    setting: any
    property: any
    value: any
    mode: any
}

export class UserSettingDeletesModel{
    username: any
    userReference: any
    appCode: any
    setting: any
    mode: any
}
export class ProfileExpiry{
    drCode: any
    mode: any

}
export class LoginModelv3{
    userNameOrEmail: any
    password: any
}

export class LoginResponseModelv3{
    appCode:any
    birthdate: any
    doctorCode: any
    first_name: any
    email:any
    firstName:any
    hl:any
    isAuthenticated:any
    isDefaultPasswordChanged:any
    jwt:any
    lastName:any
    licenseNo:any
    message:any
    middleName:any
    mobileNo:any
    mode:any
    refreshTokenExpiration:any
    roles:any
    site:any
    status:any
    userName:any
}

export class UserSettingsModelv3{
    smsNotification: any
    pushNotification: any
    darkmode: any
    privacyPolicy: any
    pfNotificationForBilling: any
    pfNotificationForUser: any
    billingContactCebu: any
    billingContactMandaue: any
    smsGatewayCHH: any
    smsGatewaySmart: any
}
export class AppSettingsModelv3{

    smsNotification: any
    pushNotification: any
    darkmode: any
    privacyPolicy: any
    pfNotificationForBilling: any
    pfNotificationForUser: any
    billingContactCebu: any
    billingContactMandaue: any
    smsGatewayCHH: any
    smsGatewaySmart: any
}
