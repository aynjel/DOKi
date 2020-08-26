import { Injectable } from '@angular/core'
import { LiteralExpr } from '@angular/compiler'

export interface InPatientData{
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
