import { Component, OnInit } from '@angular/core';
//import { Platform } from '@angular/cdk/platform';
import { AlertController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  
  private promptEvent: any;
  showButton = false;
  android:boolean = false;
  android1:boolean = false;
  ios:boolean = false;
  constructor(private platform:Platform, public alertController:AlertController) { }

  ngOnInit() {
    this.initPwaPrompt();
  }




  async Alert(data1:any,data2:any) {const alert = await this.alertController.create({cssClass: 'my-custom-class',message: data1,buttons: [{text: data2,handler: () => {}}]});await alert.present();}
  initPwaPrompt() {

    this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('desktop')) {
        window.addEventListener('beforeinstallprompt', (event: any) => {
          event.preventDefault();
          this.promptEvent = event;
          this.openPromptComponent('android');
        });
      }
      if (this.platform.is('ios')) {
        const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
        if (!isInStandaloneMode) {
          this.openPromptComponent('ios');
        }
      }
    });

  }

  async openPromptComponent(mobileType: 'ios' | 'android') {
    if(mobileType == 'android'){
      if(this.android1 == false){
        this.android = true;
      }
    }else{
      if(!this.ios){
        this.ios = true;
        this.Alert("-To install this web app on your device tap the Menu button and then 'Add to Home screen' button",'Okay');
      } 
    }
  }
  addToHomeScreen() {
    this.android = false;
    this.showButton = false;
    this.promptEvent.prompt();
    this.promptEvent.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.Alert("You can now access the app on your home screen",'Okay');
          this.android = false;
          this.android1 = true;
        } else {
        }
        this.promptEvent = null;
      });
  }
}
