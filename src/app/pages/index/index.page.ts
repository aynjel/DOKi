import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Platform } from '@angular/cdk/platform';
import { AlertController, Platform } from '@ionic/angular';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { FunctionsService } from '../../shared/functions/functions.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  private promptEvent: any;
  showButton = false;
  android: boolean = false;
  android1: boolean = false;
  ios: boolean = false;
  isDesktop: boolean;
  sampleVariable: boolean = true;
  constructor(
    private platform: Platform,
    public functionsService: FunctionsService,
    protected $gaService: GoogleAnalyticsService,
    private screensizeService: ScreenSizeService,
    public router:Router
  ) {
    if(localStorage.getItem('hasloggedin')=='1'){
      this.router.navigate(['/login']);
     // this.timerExpired();
    }else{
      this.initPwaPrompt();
      this.$gaService.pageView('/index', 'Index Page');
    }

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });

  }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pager: true,
  };

  ngOnInit() {

 
  }

  moveToNext(slides) {
    //console.log(slides);
    slides.slideNext();
  }

  moveToPrev(slides) {
    //console.log(slides);
    slides.slidePrev();
  }

  initPwaPrompt() {
    console.log('initPwaPrompt');
    
    this.platform.ready().then(() => {
      console.log('platform.ready');
      if (this.platform.is('android') || this.platform.is('desktop')) {
        console.log('platform.ready:android');
        window.addEventListener('beforeinstallprompt', (event: any) => {
          console.log(' window.addEventListener');
          event.preventDefault();
          this.promptEvent = event;
          this.openPromptComponent('android');
        });
      }
      if (this.platform.is('ios')) {
        const isInStandaloneMode =
          'standalone' in window.navigator && window.navigator['standalone'];
        if (!isInStandaloneMode) {
          this.openPromptComponent('ios');
        }
      }
    });
  }

  async openPromptComponent(mobileType: 'ios' | 'android') {
    console.log('openPromptComponent');
    if (mobileType == 'android') {
      console.log('mobileType = android');
      if (this.android1 == false) {
        this.android = true;
      }
    } else {
      if (!this.ios) {
        this.ios = true;
        this.functionsService.alert(
          "To install this web app on your device, tap the Share button on your browser’s toolbar (that’s the rectangle with an arrow pointing upward). It’s on the bar at the top of the screen on an iPad, and on the bar at the bottom of the screen on an iPhone or iPod Touch. Then, tap the 'Add to Home Screen' icon in the Share menu. Once done, you may then close your browser and launch the app from your home screen.",
          'Okay'
        );
      }
    }
  }

  addToHomeScreen() {
    this.android = false;
    this.showButton = false;
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        this.functionsService.alert(
          'Great, Dok! Once installation is done, you may then close your browser and launch the app from your home screen.',
          'Okay'
        );
        this.android = false;
        this.android1 = true;
      } else {
      }
      this.promptEvent = null;
    });
  }
}
