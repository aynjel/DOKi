import { Injectable } from "@angular/core";

@Injectable()
export class Variables {
 
    public postData = {
        username: "",
        password: "",
      };

    public tempSelection: string = "All";
    public tempSelectionTemp: string = "ALL";
    public tempCounter: number = 0;

}
