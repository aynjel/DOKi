import { Injectable } from '@angular/core'
import { LiteralExpr } from '@angular/compiler'

export class LoginModel{
    appCode: any
    username: any
    password: any
    mode:any
}


export class LoginResponseModel{
    birthdate: any
    dr_code: any
    first_name: any
    hl:any
    jwt:any
    last_name:any
    license_no:any
    middle_name:any
    mobile_no:any
    site:any
    status:any
}

export class ChangePasswordModel{
    appCode: any
    username: any
    oldPassword: any
    newPassword:any
    mode:any
}


export class InserUSerSettingsModel{
    username: any
    userReference: any
    appCode: any
    setting:any
    property:any
    value:any
    mode:any
}