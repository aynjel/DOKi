import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ParamService {
  public ds_status = new BehaviorSubject([]);
  constructor() {}
  change_ds_status(data: any) {
    this.ds_status.next(data);
  }
  get_ds_status() {
    return this.ds_status.value;
  }
}
