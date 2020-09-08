import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { Constants } from "../../shared/constants";
import { FunctionsService } from "../../shared/functions/functions.service";

@Injectable({
  providedIn: "root",
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<any>();

  constructor(private constants: Constants,
    public functionsService: FunctionsService
    ) {
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection = () => {
    //this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://appointments.chonghua.com.ph/QHub').build();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        /*"http://localhost:52080/signalHub"*/ this.constants
          .SIGNAL_R__VALUE__URL
      )
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        this.functionsService.logToConsole("Connection Started...");
        this.registerSignalEvents();
      })
      .catch((err) => {
        this.functionsService.logToConsole(
          "Error while starting connection: " + err
        );

        // if error received try starting the connection again after 3 seconds.

        // setTimeout(function() {
        //   this.startConnection();
        // }, 3000);
      });
  };

  private registerSignalEvents() {
    //this.hubConnection.on("diagnosticMessage", (data: SignalViewModel) => {
    //this.signalReceived.emit(data);
    this.hubConnection.on("SignalMessageReceived", (data: any) => {
      this.signalReceived.emit(data);
    });
  }
}