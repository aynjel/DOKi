import { Injectable } from '@angular/core'
import { LiteralExpr } from '@angular/compiler'

export interface InPatientData1{
    Doctor_Status: string
    admission_date: any
    admission_no: string
    admission_status:string
    discharged_date: string
    doctor_prof_fee: number
    dr_code: string
    first_name: string
    is_posted: string
    last_name: string
    middle_name: string
    remarks: string
    room_no: string
    site: string
}



export class InPatientData{
    AdmisisonNo: string
    DoctorCode: string
    DoctorStatusCode: string
    ProfFee: number
    DateCreated: string
    site: string
    CreatedBy: string
    Remarks: string
    DoctorMobileNumber: string
    BillingMobileNumber: string
    RoomNumber: string
    SmsGateWay: any
    OldProfFee: number
    IsVAT:string
    PayVenue:string
}



export class PatientNo{
    pfInsCoor: string
    pfIsPatientSeen: string

}




