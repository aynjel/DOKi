export class Account {
    _dr_code:string;
    birthdate:string;
    first_name:string;
    last_name:string;
    middle_name:string;
    site:string;

  set dr_code(data:string){
    this._dr_code=data;
  }
  get dr_code(){
    return this._dr_code;
  }
}

